let link = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/images";
let signBtn = document.getElementById("signBtn");
let signBtn2 = document.getElementById("signBtn2");
let addBtn = document.getElementById("home-add-btn");
let logDialog = document.getElementById("logDialog");
let addDialog = document.getElementById("addDialog");
let profileLink = document.getElementById("profile-link");
let username = localStorage.getItem("username");
let closeIcon = document.getElementById("close-icon");
let closeIcon2 = document.getElementById("close-icon-2");
let title = document.getElementById("card-title");
let emotion = document.getElementById("emotion");
let imgLink = document.getElementById("card-img");
let addBtn2 = document.getElementById("addBtn");
let warningTitle = document.getElementById("warning-title");
let warningEmotion = document.getElementById("warning-emotion");
let warningLink = document.getElementById("warning-link");
let warningAll = document.getElementById("warning-all");
closeIcon.addEventListener("click", () => {
  logDialog.close();
});
closeIcon2.addEventListener("click", () => {
  addDialog.close();
});
console.log(username);
if (!username) {
  profileLink.classList.add("none");
  signBtn.classList.remove("none");
}
signBtn.addEventListener("click", () => {
  window.location.href = "signup.html";
});
signBtn2.addEventListener("click", () => {
  window.location.href = "signup.html";
});
profileLink.addEventListener("click", () => {
  if (!username) {
    logDialog.showModal();
  } else {
    window.location.href = "profile.html";
  }
});
setInterval(() => {
  addBtn.style.color = randomColor();
}, 1000);
function randomColor() {
  const colors = [
    "#FFD03F",
    "#F05917",
    "#004962",
    "#006643",
    "#3FB2B2",
    "#A8B842",
    "#4DA553",
    "#C8001B",
    "#296FCB",
  ];
  return colors[Math.floor(Math.random() * 9)];
}
addBtn.addEventListener("click", () => {
  if (!username) {
    logDialog.showModal();
  } else {
    addDialog.showModal();
  }
});
function closeDialog() {
  if (!username) {
    logDialog.close();
  } else {
    addDialog.close();
  }
}
addBtn2.addEventListener("click", () => {
  if (title.value == "" || emotion.value == "" || imgLink.value == "") {
    warningAll.classList.remove("none");
  } else if (!checkLink(imgLink.value)) {
    warningLink.classList.add("red-warning");
  } else {
    warningAll.classList.add("none");
    warningLink.classList.add("none");
    fetch(link, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: username,
        title: title.value,
        emotion: emotion.value,
        img: imgLink.value,
      }),
    })
      .then((res) => res.json())
      .then((cards) => {
        console.log("card added");
        addDialog.close();
      });
  }
});
emotion.addEventListener("change", () => {
  let selectedEmotion = emotion.value;
  console.log(selectedEmotion);
  if (selectedEmotion == "joy") {
    emotion.style.color = "#FFD03F";
  } else if (selectedEmotion == "impress") {
    emotion.style.color = "#3FB2B2";
  } else if (selectedEmotion == "sadness") {
    emotion.style.color = "#296FCB";
  } else if (selectedEmotion == "anxiety") {
    emotion.style.color = "#F05917";
  } else {
    emotion.style.color = "#000";
  }
});
function checkLink(link) {
  let url = link.trim();
  if (!url.toLowerCase().endsWith(".jpg")) {
    return false;
  } else {
    return true;
  }
}
function CardsPage(emotion) {
  localStorage.setItem("emotion", emotion);
  window.location.href = "cards.html";
}
