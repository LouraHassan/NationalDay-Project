let link = "https://66e7e69cb17821a9d9da6ec1.mockapi.io/images";
let username = localStorage.getItem("username");
let email = localStorage.getItem("email");
let nameText = document.getElementById("nameText");
let emailText = document.getElementById("emailText");
let cardsDiv = document.getElementById("cards-div");
let logoutBtn = document.getElementById("logoutBtn");
nameText.textContent = username;
emailText.textContent = email;
console.log(username);
fetch(link)
  .then((res) => res.json())
  .then((cards) => {
    displayCards(cards);
  });
function displayCards(cards) {
  cardsDiv.textContent = "";
  checkCards(username).then((isFound) => {
    if (!isFound) {
      let nocards = document.createElement("h5");
      nocards.textContent = "لا توجد لديك مشاركات";
      nocards.classList.add("text-light");
      cardsDiv.appendChild(nocards);
    } else {
      cards.map((item) => {
        console.log(item);
        if (item.username == username) {
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
          let title = document.createElement("h5");
          let img = document.createElement("img");
          let deleteBtn = document.createElement("button");
          deleteBtn.classList.add("btn");
          deleteBtn.classList.add("my-3");
          deleteBtn.classList.add("btn-danger");
          deleteBtn.addEventListener("click", () => deleteCard(item.id));
          title.textContent = item.title;
          img.src = item.img;
          deleteBtn.textContent = "حذف";
          card.appendChild(title);
          card.appendChild(img);
          card.appendChild(deleteBtn);
          cardsDiv.appendChild(card);
        }
      });
    }
  });
}
checkCards(username).then((isFound) => {
  console.log(isFound);
});
function checkCards(username) {
  return fetch(link)
    .then((res) => res.json())
    .then((cards) => {
      let isFound = cards.some((item) => item.username == username);
      return isFound;
    });
}
function deleteCard(id) {
  fetch(link + "/" + id, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      fetch(link)
        .then((res) => res.json())
        .then((cards) => {
          displayCards(cards);
        });
    }
  });
}
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  window.location.href = "index.html";
});
