// Selector Related dragable box
let container = document.querySelector(".upload .box");
let input = document.querySelector(".upload .box input[type='file']");
// Selector Related to Preview Box
let previewbox = document.querySelector(".upload .prvbox");
let preview = document.querySelector(".upload .box .prvbox img[alt='preview']");
let RemoveImageBtn = document.querySelectorAll(".upload .prvbox button")[0];
let ChnageImageBtn = document.querySelectorAll(".upload .prvbox button")[1];
// Things need to toggel when image came
let UploadLogoImg = document.querySelector(".upload img[alt='upload']");
let UploadLogoText = document.querySelector(".upload .box p");
//Submit button
let submitBtn = document.querySelector("#submit");
let form = document.querySelector("form");

// -----------------Data come By Inputs--------------
//Getting Image from input
input.addEventListener("change", (e) => {
  // preview.src = e.target;
  // console.log(e.target.files);
  previefun(e.target.files[0]);
});
// --------------------------------------------------
//-----------Getting Image drag and drop----------------------
container.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("nice");
});

container.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  previefun(e.dataTransfer.files[0]);
});

// ----------------------------------------------
//---------Previewing-Image----------------------
function previefun(blob) {
  const fileRead = new FileReader();
  fileRead.onload = () => {
    preview.src = fileRead.result;
    localStorage.setItem("userImg", fileRead.result);
    container.style.pointerEvents = "none";
  };

  if (blob) {
    fileRead.readAsDataURL(blob);

    preview.onload = () => {
      //   //this ensures that image is loaded
      RenderImageBasedOnPresence();
    };
  }

  // console.log("Peka chu");
}

//----------------------------------------------

function RenderImageBasedOnPresence() {
  if (isImgFetched()) {
    UploadLogoText.classList.add("hide");
    UploadLogoImg.classList.add("hide");
    previewbox.classList.remove("hide");
  } else {
    UploadLogoText.classList.remove("hide");
    UploadLogoImg.classList.remove("hide");
    previewbox.classList.add("hide");
  }
}
RenderImageBasedOnPresence();
// Validation functions-------------------------------------
function isImgFetched() {
  return !(preview.naturalWidth == 0);
}
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(email);
  return emailRegex.test(email);
}
function isValidGitUserName(username) {
  const usernameRegex = /^[a-zA-Z0-9]+(?:-?[a-zA-Z0-9]+)*$/;
  // Optional: restrict length to 1-39 characters
  return (
    usernameRegex.test(username) &&
    username.length >= 1 &&
    username.length <= 39
  );
}

// --------------------------------------------------
//--------Remove Image & and Change Image------------
RemoveImageBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log("object");
  preview.src = "";
  container.style.pointerEvents = "auto";
  RenderImageBasedOnPresence();
  localStorage.clear();
});

ChnageImageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("object");
  input.click();
});

//form validation and submit----------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = e.target.email.value.trim();
  let gitUserName = e.target.gUsername.value.trim();
  // basic vaidation
  if (isImgFetched()) {
    if (isValidEmail(email)) {
      if (isValidGitUserName(gitUserName)) {
        // form.submit //his will not works because id="submit present" 
        // console.dir(e.target.fullName.value.trim());
      // We need to set 'this' explictiy and call submit ! through prototype
      // -----------------------------------------------------
      // THESE WAYS WE ARE CALLING `submit`FROM ROOT PROTOTYPE WE CAN USE ANY ONE OF THE FOLLOWING !
      HTMLFormElement.prototype.submit.call(form) 
      // e.target.__proto__.submit.call(form)
      // Object.getPrototypeOf(form).submit.call(form)
      // -----------------------------------------------------
      console.dir(e.target);  
      }
    }
  }
  // console.log(isImgFetched());
  // console.log(isValidEmail(email));
  // console.log(isValidGitUserName(gitUserName));
});
