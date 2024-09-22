let accountsLink = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/logIn";
let closeIcon = document.getElementById("close-icon");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signBtn = document.getElementById("signBtn");
let warningUsername = document.getElementById("warning-username");
let warningEmail = document.getElementById("warning-email");
let warningPassword = document.getElementById("warning-password");
let warningAll = document.getElementById("warning-all");
closeIcon.addEventListener("click", () => {
  window.location.href = "index.html";
});
signBtn.addEventListener("click", () => {
  if (username.value == "" || email.value == "" || password.value == "") {
    warningAll.classList.remove("none");
  } else if (!checkCapital(username.value)) {
    warningUsername.classList.add("red-warning");
  } else if (!validEmail(email.value)) {
    warningEmail.classList.add("red-warning");
  } else if (password.value.length < 6) {
    warningPassword.classList.add("red-warning");
  } else {
    warningUsername.classList.remove("red-warning");
    warningEmail.classList.remove("red-warning");
    warningPassword.classList.remove("red-warning");
    checkEmail(email.value).then((isFound) => {
      if (isFound) {
        warningAll.textContent = "لديك حساب بالفعل! جرب تسجيل الدخول";
        warningAll.classList.add("red-warning");
        warningAll.classList.remove("none");
      } else {
        checkUsername(username.value).then((isFound) => {
          if (isFound) {
            warningAll.textContent = "اسم المستخدم موجود بالفعل! جرب اسم آخر ";
            warningAll.classList.add("red-warning");
            warningAll.classList.remove("none");
          } else {
            warningAll.classList.add("none");
            fetch(accountsLink, {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
              }),
            })
              .then((res) => res.json())
              .then((user) => {
                console.log("Account created");
                localStorage.setItem("username", username.value);
                localStorage.setItem("email", email.value);
                console.log(localStorage.getItem("username"));
                window.location.href = "index.html";
              });
          }
        });
      }
    });
  }
});
function checkCapital(text) {
  return /[A-Z]/.test(text);
}
function validEmail(email) {
  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function checkUsername(username) {
  return fetch(accountsLink)
    .then((res) => res.json())
    .then((users) => {
      let isFound = users.some((user) => user.username == username);
      console.log(isFound);
      return isFound;
    });
}
function checkEmail(email) {
  return fetch(accountsLink)
    .then((res) => res.json())
    .then((users) => {
      let isFound = users.some((user) => user.email == email);
      console.log(isFound);
      return isFound;
    });
}
