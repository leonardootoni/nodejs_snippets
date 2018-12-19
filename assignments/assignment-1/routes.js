const fs = require("fs");

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    //defines the / page content
    response.setHeader("content-type", "text/html");
    response.write("<html><body>");
    response.write("<h1>Greetings</h1>");
    response.write('<form action="/create-user" method="POST">');
    response.write('<input type="text" name="user-name">');
    response.write('<button type="submit">Submit</button>');
    response.write("</form>");
    response.write('<a href="/users">list of users</a>');
    response.write("</html></body>");

    return response.end();
  } else if (url === "/create-user") {
    const formChunks = [];

    request.on("data", chunk => {
      formChunks.push(chunk);
    });

    request.on("end", () => {
      const formData = Buffer.concat(formChunks).toString();
      const userName = formData.split("=")[1];

      fs.writeFile("users.txt", userName, err => {
        //only send the resp after processing the file
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  } else if (url === "/users") {
    //Defines the /users content page
    response.setHeader("content-type", "text/html");
    response.write("<html><body>");
    response.write('<a href="/">Home Page</a>');
    response.write("<ul><li>Leonardo</li><li>user2</li></ul>");
    response.write("</body></html>");

    response.end();
  }
};

module.exports = {
  handler: requestHandler
};
