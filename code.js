const displayBar = document.querySelector('.display-bar');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const delButton = document.querySelector('.del-button');
const clrButton = document.querySelector('.clr-button');
const equalButton = document.querySelector('.equals');
let currentNumbers = [];

function displayNumber (event) {
  const currentDisplay = displayBar.querySelector('.display-text');
  let numToDisplay = event.target.textContent;
  
  if(!!currentDisplay) {
    let displayText = currentDisplay.textContent;
    currentDisplay.textContent = displayText + numToDisplay;
  } else {
    const numDisplay = document.createElement('span');
    const miniDisplay = document.createElement('span');
    numDisplay.classList.add('display-text');
    miniDisplay.classList.add('mini-text');
    numDisplay.textContent = numToDisplay;
    displayBar.appendChild(miniDisplay);
    displayBar.appendChild(numDisplay);
  }
}

function performOperation(event) {
  const currentDisplay = displayBar.querySelector('.display-text');
  let currentLen = currentNumbers.length;
  if(currentNumbers[currentLen - 1] !== currentDisplay.textContent) {
    currentNumbers.push(currentDisplay.textContent);
  }
  if(!!currentDisplay) {
    const miniDisplay = displayBar.querySelector('.mini-text');
    switch (event.target.textContent) {
      case '+':
        currentNumbers.push('+');
        currentDisplay.textContent = '';
        miniDisplay.textContent = currentNumbers.join(" ");
        break;
      case '-':
        currentNumbers.push('-');
        currentDisplay.textContent = '';
        miniDisplay.textContent = currentNumbers.join(" ");
        break;
      case '*':
        currentNumbers.push('*');
        currentDisplay.textContent = '';
        miniDisplay.textContent = currentNumbers.join(" ");
        break;
      case '/':
        currentNumbers.push('/');
        currentDisplay.textContent = '';
        miniDisplay.textContent = currentNumbers.join(" ");
        break;
    }
  }
}

function performEqual() {
  let currentDisplay = displayBar.querySelector('.display-text');
  let currentLen = currentNumbers.length;
  if(!!currentDisplay && currentNumbers[currentLen - 1] !== currentDisplay.textContent) {
    currentNumbers.push(currentDisplay.textContent);
  }
  if(currentNumbers.length >= 3) {
    const miniDisplay = displayBar.querySelector('.mini-text');
    miniDisplay.textContent = currentNumbers.join(" ");
    let currentTotal = Number(currentNumbers[0]);
    let counter = 1;
    while(counter < currentNumbers.length) {
      if(currentNumbers[counter] === '+') {
        currentTotal = currentTotal + Number(currentNumbers[counter + 1]);
        counter += 2;
      } else if(currentNumbers[counter] === '-') {
        currentTotal = currentTotal - Number(currentNumbers[counter + 1]);
        counter += 2;
      } else if(currentNumbers[counter] === '*') {
        currentTotal = currentTotal * Number(currentNumbers[counter + 1]);
        counter += 2;
      } else {
        currentTotal = currentTotal / Number(currentNumbers[counter + 1]);
        counter += 2;
      }
    }
    currentDisplay.textContent = currentTotal;
    currentNumbers.length = 0;
  }
}

function clearAll () {
  currentNumbers.length = 0;
  currentMiniDisplay = displayBar.querySelector('.mini-text');
  currentDisplay = displayBar.querySelector('.display-text');
  currentMiniDisplay.remove();
  currentDisplay.remove();
}

function deleteDigit () {
  const currentDisplay = displayBar.querySelector('.display-text');
  if(!!currentDisplay) {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  }
}

numberButtons.forEach(numButton => {
  numButton.addEventListener('click', displayNumber);
});

operationButtons.forEach(opButton => {
  opButton.addEventListener('click', performOperation);
});

delButton.addEventListener('click', deleteDigit);
clrButton.addEventListener('click', clearAll);
equalButton.addEventListener('click', performEqual);