window.addEventListener("load", () => {
  const button = window.document.getElementById("submit_btn");
  button.addEventListener("click", event => {
    const formField = document.getElementById("username").value;
    if (!formField) {
      event.preventDefault();
      alert("Must inform a user name before add it.");
    }
  });
});
