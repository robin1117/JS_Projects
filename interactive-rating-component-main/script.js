let ratingContainer = document.querySelectorAll(".show")[0];
let thankYouContainer = document.querySelectorAll(".show")[1];
let RatingsBox = document.querySelector(".rateHere");
let allRatingButtons = document.querySelectorAll(".rateHere BUTTON");
let representationOfRating = document.getElementById("yourRating");
let Submit = document.querySelector(".main .rating .sbt");
let backbtnImg = document.querySelector("img[alt='thankyou']");

let rating; //this is storage for user seleted rating !

RatingsBox.addEventListener("click", getSelectedRating); //this fetch rating

Submit.addEventListener("click", () => {
  // this process rating after clicking submit form
  if (rating) {
    jumpOnThankyou();
    setRatingOnThanyou(rating);
  }
});

backbtnImg.addEventListener("click", () => {
  jumpOnRating();
}); //back button on thankyou page

// ------------
function getSelectedRating(event) {
  if (event.target.nodeName == "BUTTON") {
    rating = event.target.textContent;
    restAllColorButton();
    colorSetting(event.target);
  }
  // console.dir(event.target.nodeName =="BUTTON");
}

function colorSetting(selectedBtn) {
  selectedBtn.classList.add("btnStaticColor");
}

function restAllColorButton() {
  allRatingButtons.forEach((ele) => {
    ele.classList.remove("btnStaticColor");
  });
}
// --------------------------------------------------------------
function setRatingOnThanyou(UserRating) {
  console.log((representationOfRating.textContent = UserRating));
}

// making transision--------------------------------------------
function jumpOnThankyou() {
  ratingContainer.classList.add("hide");
  thankYouContainer.classList.remove("hide");
}

function jumpOnRating() {
  ratingContainer.classList.remove("hide");
  thankYouContainer.classList.add("hide");
}
