const screen = document.getElementById('screen')

const buttons = document.getElementsByTagName("span");
const buttonArray = Array.from(buttons);

let firstOperand = [0]
let secondOperand = [0]
let operator = null


buttonArray.forEach(button => {
    button.addEventListener('click', e => {

        let OperatorClass = e.target.classList.contains('operator');

        if (e.target.innerHTML == "=") {
            operate();
        } else if (e.target.innerHTML == "C") {
            clearScreen();
        } else if (operator === null && !OperatorClass) {
            screen.innerHTML += e.target.innerText
            firstOperand.push(e.target.innerText)
        } else if (e.target.classList.contains('operator') && operator === null) {
            screen.innerHTML += e.target.innerText
            operator = e.target.innerText 
        } else if (operator !== null && !OperatorClass) {
            screen.innerHTML += e.target.innerText
            secondOperand.push(e.target.innerText)
        }  
    })
});

function clearScreen() {
    screen.innerText = ""
    firstOperand = [0]
    secondOperand = [0]
    operator = null
}

function operate() {
    if (!screen.innerText || screen.innerText === "0") {
        screen.innerText = "0"
    } else {
        screen.innerText = checkOperator();
        firstOperand = screen.innerText.split('')
        secondOperand = [0]
        operator = null
    }
}

function checkOperator() {
    let compute = null;
    switch (operator) {
        case "+":
            compute = add();
            break; 
        case "-":
            compute = subtract();
            break; 
        case "x":
            compute = multiply();
            break; 
        case "÷":
            compute = divide();
    }
    return compute 
}

function add() {
    return (parseInt(firstOperand.join('')) + parseInt(secondOperand.join('')))
}

function subtract() {
    return (parseInt(firstOperand.join('')) - parseInt(secondOperand.join('')))
}

function multiply() {
    return (parseInt(firstOperand.join('')) * parseInt(secondOperand.join('')))
}

function divide() {
    return (parseInt(firstOperand.join('')) / parseInt(secondOperand.join('')))
}

// user can use keyboad

document.addEventListener('keydown', e=> {
    console.log(e)

    if (e.keyCode == 13) {
        operate();
    } else if (e.keyCode == 27) {
        clearScreen();
    } else if (e.keyCode > 47 && e.keyCode < 58 && !e.shiftKey && operator === null) {
        screen.innerHTML += e.key
        firstOperand.push(e.key)
    } else if (e.keyCode == 189 && operator === null) {
        screen.innerHTML += e.key
        operator = "-" 
    } else if (e.keyCode == 187 && operator === null) {
        screen.innerHTML += e.key
        operator = "+" 
    } else if ((e.keyCode == 56 || e.keyCode == 88) && operator === null) {
        screen.innerHTML += "x"
        operator = "x" 
    } else if ((e.keyCode == 53 || e.keyCode == 191) && operator === null) {
        screen.innerHTML += "÷"
        operator = "÷" 
    } 
    else if (e.keyCode > 47 && e.keyCode < 58 && !e.shiftKey && operator !== null) {
        screen.innerHTML += e.key
        secondOperand.push(e.key)
    }  
})