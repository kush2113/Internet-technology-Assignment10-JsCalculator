const currentDisplay = document.querySelector('.current-display');
const previewDisplay = document.querySelector('.preview-display');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.innerText);
        } else if (button.classList.contains('operation')) {
            chooseOperation(button.innerText);
        } else if (button.classList.contains('equal')) {
            compute();
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('delete')) {
            deleteLast();
        }
        updateDisplay();
    });
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = '';
    previousOperand = '';
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = '';
}

function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
}

function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    if (operation) {
        previewDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        previewDisplay.innerText = '';
    }
}