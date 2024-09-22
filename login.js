let accountsLink = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/logIn";
let closeIcon = document.getElementById("close-icon");
let username = document.getElementById("username");
let password = document.getElementById("password");
let logBtn = document.getElementById("logBtn");
let warningPassword = document.getElementById("warning-password");
let warningAll = document.getElementById("warning-all");
closeIcon.addEventListener("click", () => {
  window.location.href = "index.html";
});
logBtn.addEventListener("click", () => {
  if (username.value == "" || password.value == "") {
    warningAll.classList.remove("none");
  } else {
    checkUser(username.value).then((isFound) => {
      if (!isFound) {
        warningAll.textContent = "لا يوجد حساب بهذا الاسم";
        warningAll.classList.remove("none");
      } else {
        warningAll.classList.add("none");
        fetch(accountsLink)
          .then((res) => res.json())
          .then((users) => {
            let user = users.find((user) => user.username == username.value);
            localStorage.setItem("email", user.email);
            if (password.value != user.password) {
              warningPassword.classList.remove("none");
            } else {
              console.log("logged is");
              localStorage.setItem("username", username.value);
              console.log(localStorage.getItem("username"));
              console.log(localStorage.getItem("email"));
              window.location.href = "index.html";
            }
          });
      }
    });
  }
});
function checkUser(username) {
  return fetch(accountsLink)
    .then((res) => res.json())
    .then((users) => {
      let isFound = users.some((user) => user.username == username);
      return isFound;
    });
}
