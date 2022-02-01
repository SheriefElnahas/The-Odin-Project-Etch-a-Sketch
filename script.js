const sketch = document.querySelector(".sketch");
const divs = document.querySelectorAll(".sketch div");
const colorPickerElement = document.querySelector('input[type="color"]');
const rangeElement = document.querySelector('input[type="range"]');
const rangeLabel = document.querySelector(".range");
const buttons = document.querySelectorAll(".btn");
let color = "#000000";
let mode = 'normal';

rangeLabel.textContent = `${rangeElement.value} X ${rangeElement.value}`;

createDivs(rangeElement.value);

const randomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};

function removeActiveClass() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
}

function clearDivs(divs) {
    for(let i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#ffffff';
    }
}

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    removeActiveClass();
    e.target.classList.add("active");
    if(e.target.textContent === 'Color mode') {
        mode = 'normal';
    }
    if (e.target.textContent === "Rainbow mode") {
      mode = 'rainbow';
    }
    if(e.target.textContent === "Eraser") {
        mode = 'eraser';
    } 
    if(e.target.textContent === 'Clear') {
        clearDivs(sketch.children);
    }
  });
});

colorPickerElement.addEventListener("change", function (e) {
  color = e.target.value;
});
sketch.addEventListener("mouseenter", function (e) {
  let divs = e.target.children;
  divs = Array.from(divs);

  divs.forEach((div) => {
    div.addEventListener("mouseenter", function () {
        if(mode === 'normal') {
            div.style.backgroundColor = color;
        } else if (mode === 'rainbow') {
            div.style.backgroundColor = randomColor();
        } else if (mode === 'eraser') {
            div.style.backgroundColor = '#ffffff'
        } 
    });
  });
});

rangeElement.addEventListener("change", function () {
  rangeLabel.textContent = `${rangeElement.value} X ${rangeElement.value}`;

  let sections = rangeElement.value;

  createDivs(sections);
});

function createDivs(divsNumber) {
  sketch.innerHTML = "";
  let width = 600 / divsNumber + "px";
  let height = 400 / divsNumber + "px";

  for (let i = 0; i < divsNumber * divsNumber; i++) {
    const div = document.createElement("div");
    div.style.height = height;
    div.style.width = width;
    sketch.append(div);
  }
}
