"use strict";

let display = document.getElementById('screen')

let currentNum = display.innerText;
let previousNum, operation, result;
let hasDot = false;
let operationChosen = false
let operationPerformed = false;


const getNum = (element) => {
    if (display.innerText === '0' && element.value !== '.') {
        display.innerText = element.value;
    } else if (element.value === '.' && !hasDot) {
        display.innerText += element.value
        hasDot = true;
    } else if (element.value !== '.') {
        display.innerText += element.value;
    }
}

const calculation = (num1, action, num2) => {
    if (num1 !== undefined && num2 !== undefined && action !== undefined && action !== '=') {
        operationPerformed = true;
        num1 = new Big(num1)
        num2 = new Big(num2)
        if (action === '+') {
            return Number((num1.add(num2)).toFixed(10))
        } else if (action === '-') {
            return Number((num1.minus(num2)).toFixed(10))
        } else if (action === '*') {
            return Number((num1.times(num2)).toFixed(10))
        } else {
            return Number((num1.div(num2)).toFixed(10))
        }
    }
}
const removeHighlighting = () => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('last-option')
    }
}

const reset = () => {
    display.innerText = result
    currentNum = display.innerText;
    result = 0
    previousNum = undefined
    operation = undefined
    operationPerformed = false
    removeHighlighting()
}

const clear = () => {
    display.innerText = '0';
    previousNum = operation = result = undefined;
    currentNum = display.innerText;
    hasDot = operationChosen = operationPerformed = false;
    buttons[0].innerText = 'AC'
    removeHighlighting()
}

let buttons = document.querySelectorAll("button");
buttons.forEach((element) => {
    element.addEventListener("click", () => {
        // logic for number
        if (element.classList.contains('num')) {

            if (operation === '=') {
                reset()
            }
            buttons[0].innerText = 'C';
            if (operationChosen) {
                display.innerText = '0';
                operationChosen = false;
                hasDot = false;
            }
            getNum(element);
            if (operation === undefined) {
                currentNum = display.innerText
            } else {
                previousNum = display.innerText;
            }
        } else if (element.classList.contains('operations')) {
            removeHighlighting();
            result = calculation(currentNum, operation, previousNum);
            if (operationPerformed) {
                reset()
            }

            element.classList.add('last-option');
            operationChosen = true;
            operation = element.value;

        } else {
            if (element.value === 'clear') {
                clear()
            } else if (element.value === '-1') {
                currentNum = currentNum * (-1);
                display.innerText = currentNum;
            } else {
                currentNum = new Big(currentNum)
                currentNum = currentNum.div(100)
                display.innerText = currentNum;
            }
        }
    })
});

