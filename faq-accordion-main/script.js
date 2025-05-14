let fulDefination = document.querySelector(".main .box span");
let back = document.querySelector(".main");

back.addEventListener("click", (e) => {
  if (e.target.matches("img[alt='click']")) {
    e.target.parentElement.nextElementSibling.classList.toggle("Hide");

    if (e.target.parentElement.nextElementSibling.classList.contains("Hide")) {
      e.target.src = "./assets/images/icon-plus.svg";
    } else {
      e.target.src = "./assets/images/icon-minus.svg";
    }
  }
});
