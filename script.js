/*************************************************************************************************************************/  
/*------------------- DOM Selection -----------------*/ 
// The container that is holding all the Boxes
const sketchContainer = document.querySelector('.sketch');


// Range Input & Label
const rangeElement = document.querySelector('input[type="range"]');
const rangeLabel = document.querySelector('.range');

// Different Modes Buttons
const buttons = document.querySelectorAll('.btn');

// Color Picker Element & Global Color Value To Hold Current Color
const colorPickerElement = document.querySelector('input[type="color"]');
let color = '#000000';
/*************************************************************************************************************************/  


/*************************************************************************************************************************/  
/*------------------- Helper Functions -----------------*/ 
function removeActiveClass() {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }
}

function clearBoxes(boxes) {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = '#ffffff';
    }
}

function removeBorder(boxes) {
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].style.border = 'none';
    }
}
// Starting Dimensions
let currentWindowWidth;
let currentWindowHeight;


// Adjust Sketch Height And Width Based On The Media Query
function changeSketchDimensionBasedOnScreenSize() {
    if(window.innerWidth >= 900) {
        currentWindowWidth = 600;
        currentWindowHeight = 400;
        createBoxes(rangeElement.value);
    } else if(window.innerWidth <= 900 & window.innerWidth > 650) {
        currentWindowWidth = 400;
        currentWindowHeight = 400;
        createBoxes(rangeElement.value);
        console.log('medium');
    } else if(window.innerWidth < 650) {
        currentWindowWidth = 300;
        currentWindowHeight = 300;
        createBoxes(rangeElement.value);
    }
  
}

function createBoxes(boxes) {
    // Clear The Sketch Before Adding Any New Boxes
    sketchContainer.innerHTML = '';

    // Calculate The Width & Height Of Each Box
    let width = currentWindowWidth / boxes + 'px';
    let height = currentWindowHeight / boxes + 'px';
  
    // Create The Actual Boxes Grid
    for (let i = 0; i < boxes * boxes; i++) {
      const div = document.createElement('div');
      div.style.height = height;
      div.style.width = width;
      sketchContainer.append(div);
    }
}


const randomNumber = () => Math.floor(Math.random() * 256);

const randomColor = () => {
    const red = randomNumber();
    const blue = randomNumber();
    const green = randomNumber();
    return `rgb(${red},${green},${blue})`;
};
/*************************************************************************************************************************/




/*************************************************************************************************************************/  
/*------------------- Initialize The Project -----------------*/ 
// This Is Not Efficient Fix It Later !
window.addEventListener('resize', function() {
    changeSketchDimensionBasedOnScreenSize()
});
function init() {
    rangeLabel.textContent = `${rangeElement.value} X ${rangeElement.value}`;
    createBoxes(rangeElement.value);
    changeSketchDimensionBasedOnScreenSize()
}

init();

/*************************************************************************************************************************/  




/*************************************************************************************************************************/  
/*------------------- DOM Events -----------------*/ 

// Change Range Label Dynamically & Create Boxes Based On Range Number;
rangeElement.addEventListener('change', function () {
    rangeLabel.textContent = `${rangeElement.value} X ${rangeElement.value}`;

    let boxesNumber = rangeElement.value;
    createBoxes(boxesNumber);
});

// Extract The Color Value From The Color Picker Element
colorPickerElement.addEventListener('change', function (e) {
    color = e.target.value;
});

// Global Variable To Store & Change Current Mode
let mode = 'normal';
buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      let currentButton = e.target;
      
      // Remove Active Class From All Buttons & Add Active Class To The Current Selected Button
      removeActiveClass();
      currentButton.classList.add('active');

      // Change Mode Logic
      if(currentButton.textContent === 'Choose Color') {
          mode = 'normal';

      }
      if (currentButton.textContent === 'Random Color') {
        mode = 'random';
        
      }
      if(currentButton.textContent === 'Eraser') {
          mode = 'eraser';
      } 
      if(currentButton.textContent === 'Clear') {
          clearBoxes(sketchContainer.children);
          currentButton.classList.remove('active');
      }

      if(currentButton.textContent === 'Remove Border') {
        currentButton.classList.remove('active');
        removeBorder(sketchContainer.children)
      }
    });
});



sketchContainer.addEventListener('mouseenter', function (e) {
  // Extract The boxes & Convert Them Into An Array
  let boxes = e.target.children;
  boxes = Array.from(boxes);

  boxes.forEach((box) => {
    box.addEventListener('mouseenter', function () {
        if(mode === 'normal') {
            box.style.backgroundColor = color;
        } else if (mode === 'random') {
            box.style.backgroundColor = randomColor();
        } else if (mode === 'eraser') {
            box.style.backgroundColor = '#ffffff'
        } 
    });
  });
});




