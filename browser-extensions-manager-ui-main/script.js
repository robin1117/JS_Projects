let controler = document.querySelector(".controls");
let gridContainer = document.querySelector("body > main > div.gridcontainer");

controler.addEventListener("click", (e) => {
  // console.log(e.target.matches(".btn"));
  if (e.target.matches(".btn")) {
    addActiveClassBasedOnClick(e.target);
  }
});

function addActiveClassBasedOnClick(btn) {
  removeActiveClassFromAll();
  btn.classList.add("Active");
}

function removeActiveClassFromAll() {
  [...controler.children].forEach((ele) => {
    ele.classList.remove("Active");
  });
}

// -------fetch and render------------------------

let list = [];
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    list = data;
    render(list);
  });

function render(data) {
  let e1 = "";
  if (data.length) {
    console.log("means the array is not emty");
    data.forEach((ele) => {
      e1 += `<div class="e1">
            <div class="header">
              <img src="${ele.logo}" alt="DevLens">
              <div class="txt">
                <h3>${ele.name}</h3>
                <p>
                  ${ele.description}
                </p>
              </div>
            </div>
            <div class="btns">
              <button class="btn">Remove</button>
              <label class="switch">
                <input type="checkbox" ${
                  ele.isActive ? "checked" : ""
                } onchange = 'changeState("${ele.name}")'>
                <span class="slider"></span>
              </label>
            </div>
          </div>`;
    });
    gridContainer.innerHTML = e1;
    // gridContainer.innerHTML = "Kuch to hey";
  } else {
    gridContainer.innerHTML = "";
    console.log("empty");
  }
}

function changeState(extensionName) {
  let selectedElement = list.find(
    (ele) => ele.name.toLowerCase() == extensionName.toLowerCase()
  );
  console.log(selectedElement);
  if (selectedElement) {
    selectedElement.isActive = !selectedElement.isActive;
    // console.log(selectedElement.isActive);
    let RemoteState = [...controler.children].filter((e) =>
      e.matches(".Active")
    )[0].innerHTML;
    // console.log(RemoteState);

    // render(list);
    // filter(RemoteState)
    // console.log(list);
  }
}

function filter(type) {
  if (type === "All") {
    // console.log(list);
    render(list);
  } else if (type === "Active") {
    // console.log(list.filter((d) => d.isActive));
    render(list.filter((d) => d.isActive));
  } else if (type === "Inactive") {
    // console.log(list.filter((d) => !d.isActive));
    render(list.filter((d) => !d.isActive));
  }
}

const toggleBtn = document.querySelector('img[alt="dark-light"]');
const body = document.body;

let bool = true;
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  if (bool) {
    toggleBtn.src = "./assets/images/icon-moon.svg";
    console.log(bool);
    bool = !bool;
  } else {
    toggleBtn.src = "./assets/images/icon-sun.svg";
    bool = !bool;
    console.log(bool);
  }
});
