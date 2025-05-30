// Top heading
let headingFullName = document.querySelectorAll("#fullName")[0];
let headingEmail = document.querySelectorAll("#email")[0];

//Card
let cardFullName = document.querySelectorAll("#fullName")[1];
let cardProfileImg = document.querySelector("#profileImage");
let cardProfileEmail = document.querySelectorAll("#email")[1];
let cardId = document.querySelector("#uid");

//GETTING IMAGE FORM LOCAL STORAGE !
let getUserImgfromLocalStorage = localStorage.userImg;

//GETTING DATA FROM URL !
let searchQuery = window.location.search;
let fullName = new URLSearchParams(searchQuery).get("fullName");
let email = new URLSearchParams(searchQuery).get("email");
let gitUserName = new URLSearchParams(searchQuery).get("gUsername");

//RENDERS DATA ON PAGE !

headingFullName.textContent = fullName;
cardFullName.textContent = fullName;

headingEmail.textContent = email;
cardProfileEmail.textContent = email;

cardProfileImg.src = getUserImgfromLocalStorage
