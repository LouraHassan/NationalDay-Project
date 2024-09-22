let accountsLink = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/logIn";
let closeIcon = document.getElementById("close-icon");
let closeIcon2 = document.getElementById("close-icon2");
let username = document.getElementById("username");
let password = document.getElementById("password");
let logBtn = document.getElementById("logBtn");
let forgotLink = document.getElementById('forgot-link')
let passwordDialog = document.getElementById('passwordDialog')
let warningPassword = document.getElementById("warning-password");
let warningAll = document.getElementById("warning-all");

let email = document.getElementById('email')
let newPassword = document.getElementById('newPassword')
let changeBtn = document.getElementById('changeBtn')
let changeText = document.getElementById('changeText')
let warningAll2 = document.getElementById("warning-all-2");
let warningPassword2 = document.getElementById("warning-password-2");

closeIcon.addEventListener("click", () => {
  window.location.href = "index.html";
});
closeIcon2.addEventListener("click", () => {
   passwordDialog.close()
  });
forgotLink.addEventListener('click', () => {
    passwordDialog.showModal()
})
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

changeBtn.addEventListener('click', () => {
    if (email.value == '' || newPassword.value == '') {
        warningAll2.classList.remove('none')

    } else if (newPassword.value .length< 6) {
        warningPassword2.classList.add('red-warning')
    }
    else {
        checkEmail(email.value).then(isFound => {
            if (!isFound) {
                warningAll2.textContent = 'لا يوجد حساب بهذا البريد'
            warningAll2.classList.remove('none') 
            }
            else {
                warningPassword2.classList.add('none') 

                fetch(accountsLink).then(res => res.json()).then(users => {
                    let user = users.find(user => user.email == email.value)
                    user.password = newPassword.value;

                    fetch(accountsLink + '/' + user.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify(user)
                    }).then(res => res.json()).then(() => {
                        console.log("password updates");
                        changeText.classList.remove('none')
                    })
                })
            }
        })
        
      }  
})
function checkUser(username) {
  return fetch(accountsLink)
    .then((res) => res.json())
    .then((users) => {
      let isFound = users.some((user) => user.username == username);
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