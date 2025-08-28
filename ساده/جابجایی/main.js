const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

const allToRightBtn = document.querySelector(".all-to-right");
const allToLeftBtn = document.querySelector(".all-to-left");
const checkedToRightBtn = document.querySelector(".checked-to-right");
const checkedToLeftBtn = document.querySelector(".checked-to-left");

// Initial Values
let leftList = [
  { id: "item1", checked: false, title: "PHP" },
  { id: "item2", checked: false, title: "Python" },
  { id: "item3", checked: false, title: "Ruby" },
  { id: "item4", checked: false, title: "C++" },
];
let rightList = [
  { id: "item5", checked: false, title: "HTML" },
  { id: "item6", checked: false, title: "Css" },
  { id: "item7", checked: false, title: "JavaScript" },
  { id: "item8", checked: false, title: "Java" },
];

renderDom(leftList, rightList);

// Render Dom
function renderDom(leftListToRender, rightListToRender) {
  clearDom();

  leftListToRender.forEach((item) => {
    leftSide.innerHTML += `<div class="box">
        <input type="checkbox" class="input-box" id="${item.id}" ${item.checked ? "checked" : ""
      }/>
        <label for="${item.id}">${item.title}</label>
        </div>`;
  });

  rightListToRender.forEach((item) => {
    rightSide.innerHTML += `<div class="box">
          <input type="checkbox" class="input-box" id="${item.id}" ${item.checked ? "checked" : ""
      }/>
          <label for="${item.id}">${item.title}</label>
          </div>`;
  });

  updateButtons();
  registerEvents();
}

// Clear Dom
function clearDom() {
  leftSide.innerHTML = "";
  rightSide.innerHTML = "";
}

// Event
function registerEvents() {
  document.querySelectorAll(".input-box").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const id = e.target.id;
      leftList = leftList.map((item) =>
        item.id === id ? { ...item, checked: e.target.checked } : item
      );
      rightList = rightList.map((item) =>
        item.id === id ? { ...item, checked: e.target.checked } : item
      );
    });
  });

  allToRightBtn.onclick = () => {
    rightList = [...rightList, ...leftList];
    leftList = [];
    renderDom(leftList, rightList);
  };

  allToLeftBtn.onclick = () => {
    leftList = [...leftList, ...rightList];
    rightList = [];
    renderDom(leftList, rightList);
  };

  checkedToRightBtn.onclick = () => {
    const toMove = leftList.filter((item) => item.checked);
    leftList = leftList.filter((item) => !item.checked);
    rightList = [...rightList, ...toMove.map((i) => ({ ...i, checked: false }))];
    renderDom(leftList, rightList);
  };

  checkedToLeftBtn.onclick = () => {
    const toMove = rightList.filter((item) => item.checked);
    rightList = rightList.filter((item) => !item.checked);
    leftList = [...leftList, ...toMove.map((i) => ({ ...i, checked: false }))];
    renderDom(leftList, rightList);
  };
}

function updateButtons() {
  if (leftList.length === 0) {
    allToRightBtn.classList.add("disabled");
    checkedToRightBtn.classList.add("disabled");
  } else {
    allToRightBtn.classList.remove("disabled");
    checkedToRightBtn.classList.remove("disabled");
  }

  if (rightList.length === 0) {
    allToLeftBtn.classList.add("disabled");
    checkedToLeftBtn.classList.add("disabled");
  } else {
    allToLeftBtn.classList.remove("disabled");
    checkedToLeftBtn.classList.remove("disabled");
  }
}
