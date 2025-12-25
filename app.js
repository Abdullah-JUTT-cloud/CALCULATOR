const display = document.getElementById('display');

let currentNumber = '0';
let previousNumber = null;
let operation = null;
let waitingForOperand = false;

const btnClear = document.getElementById('btn-clear');
const btnBackspace = document.getElementById('btn-backspace');
const btnDivide = document.getElementById('btn-divide');
const btnMultiply = document.getElementById('btn-multiply');
const btnSubtract = document.getElementById('btn-subtract');
const btnAdd = document.getElementById('btn-add');
const btnEquals = document.getElementById('btn-equals');
const btnDecimal = document.getElementById('btn-decimal');
const btnPercentage = document.getElementById('btn-percentage');
const btnSquare = document.getElementById('btn-square');
const btnSqrt = document.getElementById('btn-sqrt');

const btn0 = document.getElementById('btn-0');
const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');
const btn4 = document.getElementById('btn-4');
const btn5 = document.getElementById('btn-5');
const btn6 = document.getElementById('btn-6');
const btn7 = document.getElementById('btn-7');
const btn8 = document.getElementById('btn-8');
const btn9 = document.getElementById('btn-9');

function updateDisplay() {
    display.value = currentNumber;
}

function inputNumber(num) {
    if (waitingForOperand) {
        currentNumber = String(num);
        waitingForOperand = false;
    } else {
        currentNumber = currentNumber === '0' ? String(num) : currentNumber + num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentNumber = '0.';
        waitingForOperand = false;
    } else if (currentNumber.indexOf('.') === -1) {
        currentNumber = currentNumber + '.';
    }
    updateDisplay();
}

function inputOperator(nextOperator) {
    const inputValue = Number(currentNumber);

    if (previousNumber === null) {
        previousNumber = inputValue;
    } else if (operation) {
        const result = calculate(previousNumber, inputValue, operation);
        currentNumber = String(result);
        previousNumber = result;
        updateDisplay();
    }

    waitingForOperand = true;
    operation = nextOperator;
}

function calculate(firstNumber, secondNumber, operator) {
    if (operator === '+') {
        return firstNumber + secondNumber;
    } else if (operator === '-') {
        return firstNumber - secondNumber;
    } else if (operator === '*') {
        return firstNumber * secondNumber;
    } else if (operator === '/') {
        return firstNumber / secondNumber;
    }
    return secondNumber;
}

function performEquals() {
    const inputValue = Number(currentNumber);

    if (operation && previousNumber !== null) {
        const result = calculate(previousNumber, inputValue, operation);
        currentNumber = String(result);
        previousNumber = null;
        operation = null;
        waitingForOperand = true;
        updateDisplay();
    }
}

function clearAll() {
    currentNumber = '0';
    previousNumber = null;
    operation = null;
    waitingForOperand = false;
    updateDisplay();
}

function removeLastDigit() {
    if (!waitingForOperand) {
        currentNumber = currentNumber.slice(0, -1);
        if (currentNumber === '' || currentNumber === '-') {
            currentNumber = '0';
        }
        updateDisplay();
    }
}

function calculatePercentage() {
    const value = Number(currentNumber);
    currentNumber = String(value / 100);
    updateDisplay();
}

function calculateSquare() {
    const value = Number(currentNumber);
    currentNumber = String(value * value);
    updateDisplay();
}

function calculateSquareRoot() {
    const value = Number(currentNumber);
    if (value >= 0) {
        currentNumber = String(Math.sqrt(value));
    } else {
        currentNumber = 'Error';
    }
    updateDisplay();
}

btn0.addEventListener('click', function() { inputNumber('0'); });
btn1.addEventListener('click', function() { inputNumber('1'); });
btn2.addEventListener('click', function() { inputNumber('2'); });
btn3.addEventListener('click', function() { inputNumber('3'); });
btn4.addEventListener('click', function() { inputNumber('4'); });
btn5.addEventListener('click', function() { inputNumber('5'); });
btn6.addEventListener('click', function() { inputNumber('6'); });
btn7.addEventListener('click', function() { inputNumber('7'); });
btn8.addEventListener('click', function() { inputNumber('8'); });
btn9.addEventListener('click', function() { inputNumber('9'); });

btnAdd.addEventListener('click', function() { inputOperator('+'); });
btnSubtract.addEventListener('click', function() { inputOperator('-'); });
btnMultiply.addEventListener('click', function() { inputOperator('*'); });
btnDivide.addEventListener('click', function() { inputOperator('/'); });

btnEquals.addEventListener('click', performEquals);
btnClear.addEventListener('click', clearAll);
btnBackspace.addEventListener('click', removeLastDigit);
btnDecimal.addEventListener('click', inputDecimal);
btnPercentage.addEventListener('click', calculatePercentage);
btnSquare.addEventListener('click', calculateSquare);
btnSqrt.addEventListener('click', calculateSquareRoot);

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || 
        key === '*' || key === '/' || key === 'Enter' || key === '=' || 
        key === 'Backspace' || key === 'Escape' || key === '%') {
        event.preventDefault();
    }

    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        inputOperator('+');
    } else if (key === '-') {
        inputOperator('-');
    } else if (key === '*') {
        inputOperator('*');
    } else if (key === '/') {
        inputOperator('/');
    } else if (key === 'Enter' || key === '=') {
        performEquals();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        removeLastDigit();
    } else if (key === '%') {
        calculatePercentage();
    }
});

updateDisplay();