let link = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/images";
let username = localStorage.getItem("username");
let signBtn = document.getElementById("signBtn");
let emotion = localStorage.getItem("emotion");
let cardsDiv = document.getElementById("cards-div");
let profileLink = document.getElementById("profile-link");
let title = document.getElementById("title");
let logDialog = document.getElementById("logDialog");
let closeIcon = document.getElementById("close-icon");
closeIcon.addEventListener("click", () => {
  logDialog.close();
});
if (!username) {
    profileLink.classList.add("none");
    signBtn.classList.remove("none");
  }
signBtn.addEventListener("click", () => {
  window.location.href = "signup.html";
});
profileLink.addEventListener("click", () => {
  if (!username) {
    logDialog.showModal();
  } else {
    window.location.href = "profile.html";
  }
});
if (emotion == "joy") {
  title.textContent = "لحظات سعيدة باليوم الوطني";
  title.classList.add("joy-text");
} else if (emotion == "impress") {
  title.textContent = "لحظات مبهرة باليوم الوطني";
  title.classList.add("impress-text");
} else if (emotion == "sadness") {
  title.textContent = "لحظات الاستياء باليوم الوطني";
  title.classList.add("sadness-text");
} else if (emotion == "anxiety") {
  title.textContent = "لحظات مقلقة باليوم الوطني";
  title.classList.add("anxiety-text");
}
fetch(link)
  .then((res) => res.json())
  .then((cards) => {
    cards.map((item) => {
      if (item.emotion == emotion) {
        let card = document.createElement("div");
        card.classList.add("card");
        if (item.emotion == "joy") {
          card.classList.add("joy-border");
        } else if (item.emotion == "impress") {
          card.classList.add("impress-border");
        } else if (item.emotion == "sadness") {
          card.classList.add("sadness-border");
        } else if (item.emotion == "anxiety") {
          card.classList.add("anxiety-border");
        }
        let title = document.createElement("h4");
        let img = document.createElement("img");
        let tag = document.createElement("p");
        title.textContent = item.title;
        img.src = item.img;
        tag.textContent = "من " + item.username;
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(tag);
        cardsDiv.appendChild(card);
      }
    });
  });
