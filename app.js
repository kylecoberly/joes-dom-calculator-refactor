const screen = document.querySelector('#screen');
const buttons = document.querySelectorAll("span");
const buttonArray = Array.from(buttons);

let firstOperand = [0];
let secondOperand = [0];
let operator = null;
function getOperator(){
  return operator
}

buttonArray.forEach(attachEventListener(getOperator));
document.addEventListener('keydown', handleKeydown)

function attachEventListener(getOperator){
    return button => {
      button.addEventListener('click', handleButtonPress(getOperator));
    }
}

function handleButtonPress(getOperator){
  return event => {
    let OperatorClass = event.target.classList.contains('operator');
    const content = event.target.innerText

    if (content == "=") {
        operate(getOperator);
    } else if (content == "C") {
        clearScreen();
    } else if (operator === null && !OperatorClass) {
        screen.innerHTML += content;
        firstOperand.push(content);
    } else if (event.target.classList.contains('operator') && operator === null) {
        screen.innerHTML += content;
        operator = content;
    } else if (operator !== null && !OperatorClass) {
        screen.innerHTML += content;
        secondOperand.push(content);
    }  
  }
}

function clearScreen() {
    screen.innerText = "";
    firstOperand = [0];
    secondOperand = [0];
    operator = null;
}

function operate(getOperator) {
    if (!screen.innerText || screen.innerText === "0") {
        screen.innerText = "0";
    } else {
        screen.innerText = checkOperator(getOperator);
        firstOperand = screen.innerText.split('');
        secondOperand = [0];
        operator = null;
    }
}

function checkOperator(getOperator) {
    let compute = null;
    const operations = {
      "+": add,
      "-": subtract,
      "x": multiply,
      "÷": divide,
    }
    return operations[getOperator()]()
}

function add() {
    return +firstOperand.join('') + +secondOperand.join('')
}

function subtract() {
    return (parseInt(firstOperand.join('')) - parseInt(secondOperand.join('')));
}

function multiply() {
    return (parseInt(firstOperand.join('')) * parseInt(secondOperand.join('')));
}

function divide() {
    return (parseInt(firstOperand.join('')) / parseInt(secondOperand.join('')));
}


function handleKeydown(someExternalThing){
  return function(event){
    if (event.keyCode == 13) {
        operate(operator);
    } else if (event.keyCode == 27) {
        clearScreen();
    } else if (event.keyCode > 47 && event.keyCode < 58 && !event.shiftKey && operator === null) {
        screen.innerHTML += event.key;
        firstOperand.push(event.key);
    } else if (event.keyCode == 189 && operator === null) {
        screen.innerHTML += event.key;
        operator = "-";
    } else if (event.keyCode == 187 && operator === null) {
        screen.innerHTML += event.key;
        operator = "+";
    } else if ((event.keyCode == 56 || event.keyCode == 88) && operator === null) {
        screen.innerHTML += "x";
        operator = "x";
    } else if ((event.keyCode == 53 || event.keyCode == 191) && operator === null) {
        screen.innerHTML += "÷";
        operator = "÷";
    } 
    else if (event.keyCode > 47 && event.keyCode < 58 && !event.shiftKey && operator !== null) {
        screen.innerHTML += event.key;
        secondOperand.push(event.key);
    }  
  }
}
