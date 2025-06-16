let backBtn = document.querySelector(".btn-back");
let nextBtn = document.querySelector(".btn-next");
let submitBtn = document.querySelector(".btn-submit");
let formAllStepStatus = document.querySelectorAll(".left-status .btn");
let formHeading = document.querySelector(".header h1");
let formSubHeading = document.querySelector(".header p");
let formSteps = document.querySelectorAll("form .all-from-section");

//JS Mechaninsm for Roaming around Different steps in form-

let formStepsHeadings = [
  {
    heading: "Personal info",
    subHeading: "Please provide your name, email address, and phone number.",
  },
  {
    heading: "Select your plan",
    subHeading: "You have the option of monthly or yearly billing.",
  },
  {
    heading: "Pick add-ons",
    subHeading: "Add-ons help enhance your gaming experience.",
  },
  {
    heading: "Finishing up",
    subHeading: "Double-check everything looks OK before confirming.",
  },
];
let onStep = 0;

//These are just addevent Listerns --
nextBtn.addEventListener("click", () => {
  // nextStep();
});
backBtn.addEventListener("click", () => {
  previousStep();
});
// ---------------------------------------

//function to increamant Step and render buttons
function nextStep() {
  if (onStep <= 3) onStep++;
  // console.log(onStep);
  renderButtonsBasedOnStep();
}

//function to decreameant Step and render buttons
function previousStep() {
  if (onStep > 0) onStep--;
  // console.log(onStep);
  renderButtonsBasedOnStep();
}

// function that show on which section we are now on form.
function stepChanger() {
  formAllStepStatus.forEach((ele, index) => {
    onStep === index
      ? ele.classList.add("active-btn")
      : ele.classList.remove("active-btn");
  });
}
// JS styling or buttons
function renderButtonsBasedOnStep() {
  if (onStep == 0) backBtn.classList.add("hide-btn");
  else backBtn.classList.remove("hide-btn");

  if (onStep > 2) {
    nextBtn.classList.add("hide-btn");
    submitBtn.classList.remove("hide-btn");
  }

  if (onStep <= 2) {
    nextBtn.classList.remove("hide-btn");
    submitBtn.classList.add("hide-btn");
  }
  upDatingFormHeading();
  stepChanger();
}
renderButtonsBasedOnStep();

// Dynamically Updating form Heading-
function upDatingFormHeading() {
  formStepsHeadings.forEach((ele, index) => {
    if (index == onStep) {
      formHeading.innerHTML = ele.heading;
      formSubHeading.innerHTML = ele.subHeading;
    }
  });
  updateFormView();
}

//Step 1 YOUR INFO MECHANISM---
let showErrorMsg = document.querySelectorAll(".first-step p.error");
let nameField = document.querySelector(
  ".first-step .input-fields input[type='text']"
);
let emailField = document.querySelector(
  ".first-step .input-fields input[type='email']"
);
let phoneField = document.querySelector(
  ".first-step .input-fields input[type='tel']"
);

//VALIDATER FUNCTION
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidIndianPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

function validationForFirstStep() {
  let testcases = 0;

  if (nameField.value) {
    testcases++;
    showErrorMsg[0].style.display = "none";
  } else {
    showErrorMsg[0].style.display = "block";
  }

  if (isValidEmail(emailField.value)) {
    showErrorMsg[1].style.display = "none";
    testcases++;
  } else {
    showErrorMsg[1].style.display = "block";
  }

  if (isValidIndianPhone(phoneField.value)) {
    showErrorMsg[2].style.display = "none";
    testcases++;
  } else {
    showErrorMsg[2].style.display = "block";
  }
  console.log(testcases);
  if (testcases === 3) {
    nextStep();
  } else {
    console.log("Problem with first step Might your INput not Correct");
  }
}

//This data may be come from server So that user cannot change from Frontend Side -

let Pricing = [
  {
    PlaneName: "Arcade",
    BillingType: "Monthly",
    Price: 9,
    Bonus: "Na",
  },
  {
    PlaneName: "Advanced",
    BillingType: "Monthly",
    Price: 12,
    Bonus: "Na",
  },
  {
    PlaneName: "Pro",
    BillingType: "Monthly",
    Price: 15,
    Bonus: "Na",
  },
  {
    PlaneName: "Arcade",
    BillingType: "Yearly",
    Price: 90,
    Bonus: "2M",
  },
  {
    PlaneName: "Advanced",
    BillingType: "Yearly",
    Price: 120,
    Bonus: "2M",
  },
  {
    PlaneName: "Pro",
    BillingType: "Yearly",
    Price: 150,
    Bonus: "2M",
  },
];

// These are available on Server
let addOns = [
  {
    serviceType: "Online service",
    serviceDescription: "Access to multiplayer games",
    price: 5,
    id: 1,
  },
  {
    serviceType: "Large Storage",
    serviceDescription: "Extra 1TB of cloud",
    price: 10,
    id: 2,
  },
  {
    serviceType: "Customizable Profile",
    serviceDescription: "Custom theme on your profile",
    price: 15,
    id: 3,
  },
];

//JS Mechanism for SELECT YOUR PLAN (step-2-) -
let cards = document.querySelectorAll(".second-step .card");
let input = document.querySelector(".plan-mode input");
let planModeMonthly = document.querySelector(".plan-mode .monthly");
let planModeYearly = document.querySelector(".plan-mode .yearly");
// Hidden input
let selectedPlan = document.querySelector(
  ".second-step input[name='selectedPlan']"
);
let billingType = document.querySelector(
  ".second-step input[name='billingType']"
);
//Card inner Data
let arcadePrice = document.querySelector(".second-step .arcade > p");
let advancePrice = document.querySelector(".second-step .advanced > p");
let proPrice = document.querySelector(".second-step .pro > p");
let give2MonthExtra = document.querySelectorAll(".second-step .card span");
//whole form
mainForm = document.querySelector("form");

//Highlight Monthly or Yearly based on input check type.[STYLING]
input.addEventListener("click", () => {
  if (input.checked) {
    planModeYearly.classList.add("active-plan-type");
    planModeMonthly.classList.remove("active-plan-type");
  } else {
    planModeYearly.classList.remove("active-plan-type");
    planModeMonthly.classList.add("active-plan-type");
  }
  updateCardBaseOnMonth();
});

//Highlighting cards that is selected.[STYLING]
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    cards.forEach((ele) => {
      ele.dataset === e.target.dataset
        ? ele.classList.add("active-selected-plan")
        : ele.classList.remove("active-selected-plan");
    });
    //setting hidden input value
    selectedPlan.value = e.target.dataset.name;
  });
});

//Updating Card Based on Monthly or Yearly [STYLING] and setting value of input[TRANSMISSION]
function updateCardBaseOnMonth() {
  // changes for plan-mode Yearly
  if (input.checked) {
    arcadePrice.textContent = `$90/mo`;
    advancePrice.textContent = `$120/mo`;
    proPrice.textContent = `$150/mo`;
    give2MonthExtra.forEach((span) => (span.style.display = "block"));
    //setting hidden input value
    billingType.value = "Yearly";
  }

  // changes for plan-mode Monthly
  else {
    arcadePrice.textContent = `$9/mo`;
    advancePrice.textContent = `$12/mo`;
    proPrice.textContent = `$15/mo`;
    give2MonthExtra.forEach((span) => (span.style.display = "none"));
    //setting hidden input value
    billingType.value = "Monthly";
  }
}

//JS Mechanins for ADD-ONS(step-3-)-

//Highlighting selected add-ons :
let allAddons = document.querySelectorAll(".third-step .add-ons input");

allAddons.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    // console.log(e.target.checked);
    allAddons.forEach((ele) => {
      // console.log(ele);
      // console.log(ele.closest(".add-ons"));
      if (ele.checked) {
        ele.closest(".add-ons").classList.add("active-add-on");
      } else {
        ele.closest(".add-ons").classList.remove("active-add-on");
      }
    });
  });
});

// This Step fetches data from server based on user details provide
//Seleted plan - Monthly \ Yearly , plan Name ?
//Add-ons - 1 or 2 or 3 or all

//Summery Step
let planTypeOut = document.querySelectorAll(".fourth-step .plan p span");
let planPriceOut = document.querySelector(".fourth-step .plan p.price");
let addOnContainer = document.querySelector(".fourth-step .add-ons");
let totalPriceOut = document.querySelector(
  ".fourth-step .total-amount > p.price"
);

function RenderSummeryPage() {
  let totalPrice = 0;
  planTypeOut[0].textContent = selectedPlan.value;
  planTypeOut[1].textContent = billingType.value;

  let fetchedPriceBasedOnUserData = Pricing.find((plan) => {
    if (
      plan.BillingType.toLowerCase() === billingType.value.toLowerCase() &&
      plan.PlaneName.toLowerCase() === selectedPlan.value.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  });

  console.log(fetchedPriceBasedOnUserData);

  planPriceOut.textContent = "$" + fetchedPriceBasedOnUserData.Price + "/mo";
  totalPrice += fetchedPriceBasedOnUserData.Price;

  let htmlUpdated = "";

  let userSelectedAddons = [...allAddons].filter((input) => input.checked);
  userSelectedAddons.forEach((seletedInput) => {
    let selectedItemID = seletedInput.value;

    addOns.forEach((AddOnObj) => {
      if (AddOnObj.id == selectedItemID) {
        htmlUpdated += `<div class="add-on">
                          <span>${AddOnObj.serviceType}</span>
                          <p>+$ ${AddOnObj.price}/mo</p>
                        </div>`;
        totalPrice += AddOnObj.price;
      }
    });
  });

  addOnContainer.innerHTML = htmlUpdated;
  totalPriceOut.innerHTML = "$" + totalPrice + "/mo";
}

//This function just update the form view based on fomr step

function updateFormView() {
  formSteps.forEach((formElement, formStepIndex) => {
    if (formStepIndex == onStep) {
      formElement.classList.remove("hide-form");
    } else {
      formElement.classList.add("hide-form");
    }
  });
}

//Roaming around steps after Validation Using Switch Cases -[MAIN ROOT FUNCTION]
function roamingAroundSteps() {
  // console.log(onStep);
  switch (onStep) {
    case 0:
      validationForFirstStep();
      break;

    case 1:
      nextStep();
      break;

    case 2:
      nextStep();
      RenderSummeryPage();
      break;

    case 3:
      fromSubmition();
      break;
  }
}

let thankyoupage = document.querySelector(".main-inputs .submit-succesfully");
function fromSubmition() {
  formSteps.forEach((steps) => {
    steps.classList.add("hide-form");
  });
  document.querySelector(".main-inputs .header").classList.add("hide-form");
  document.querySelector(".controls").classList.add("hide-form");
  thankyoupage.style.display = "block";
  setTimeout(() => {
    mainForm.submit();
  }, 2000);
}
