/* If there is a userform, register a form submit event click to require a name input*/
window.addEventListener("load", e => {
  if (document.getElementById("username-form")) {
    document.getElementById("submit-btn").addEventListener("click", e => {
      const userNameField = document.getElementById("userNameField").value;
      if (!userNameField) {
        alert("A valid user name must be provided");
        e.preventDefault(); //blocks the default post behaviour
      }
    });
  }
});
