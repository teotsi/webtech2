let inputs = document.querySelectorAll('#login-password, #repeat-password');
for (const input of inputs) {
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      if (input.id === "login-password") {
        document.getElementById("login-submit").click();
      } else {
        document.getElementById("register-submit").click();
      }
    }
  });
}

const redirectLoggedIn = () => {

  getLoggedInUser()
    .then(response => {
      if (!response.status) {
        location.href = "profile.html"
      }
    });
};