const fs = require("fs");

const requestHandler = (req, resp) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    //Give back a html content for the / (home page)
    resp.setHeader("content-type", "text/html");
    resp.write("<html><body>");
    resp.write('<form action="/message" method="POST">');
    resp.write('<input type="text" name="field"><button type="submit">Send</button>');
    resp.write("</form>");
    resp.write("</body></html>");

    return resp.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    //register an event handler to handle incoming data
    req.on("data", chunk => {
      //save all request chunks into body[]
      body.push(chunk);
    });

    //register an event handler to handle the End of a request data
    return req.on("end", () => {
      //concat all body[] chunks and generates a string
      const parsedBody = Buffer.concat(body).toString();

      //get only the data from a key=value pair
      const message = parsedBody.split("=")[1];

      fs.writeFile("message.txt", message, err => {
        //only send the resp after processing the file
        resp.statusCode = 302;
        resp.setHeader("Location", "/");
        return resp.end();
      });
    });
  }
};

//exporting the function requestHandler globally
module.exports = {
  handler: requestHandler,
  someText: "This is a text"
};
