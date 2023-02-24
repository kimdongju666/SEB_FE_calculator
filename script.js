const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  if (operator === '+') {
    result = parseFloat(n1) + parseFloat(n2);
  }
  if (operator === '-') {
    result = parseFloat(n1) - parseFloat(n2);
  }
  if (operator === '*') {
    result = parseFloat(n1) * parseFloat(n2);
  }
  if (operator === '/') {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    if (action === 'number') {
      if(firstOperend.textContent === "0") {
        firstOperend.textContent = buttonContent;
      }
      else if(firstOperend.textContent !== "0") {
        secondOperend.textContent = buttonContent;
      }
      console.log('숫자 ' + buttonContent + ' 버튼');
      
    }

    if (action === 'operator') {
      console.log('연산자 ' + buttonContent + ' 버튼');
      operator.textContent = buttonContent;
    }

    if (action === 'decimal') {
      console.log('소수점 버튼');
    }

    if (action === 'clear') {
      console.log('초기화 버튼');
      firstOperend.textContent = "0"
      secondOperend.textContent = "0"
      operator.textContent = "+"
      calculatedResult.textContent = "0"
    }

    if (action === 'calculate') {
      console.log('계산 버튼');
      calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
    }
  }
});


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    if (action === 'number') {
      if (display.textContent === '0' || previousKey === 'operator') {
        display.textContent = buttonContent;
      }
      else {
        display.textContent = display.textContent + buttonContent;
      }
      previousKey = 'number';


      /*if (operatorForAdvanced !== undefined) {
        if(display.textContent === firstNum) {
          display.textContent = buttonContent;
          }
          else {
            display.textContent = display.textContent + buttonContent;
          }
        }
        else if (operatorForAdvanced === undefined && display.textContent === "0") {
          display.textContent = buttonContent;
          firstNum = display.textContent
        }
        else if (operatorForAdvanced === undefined && display.textContent !== "0") {
          display.textContent = display.textContent + buttonContent;
          firstNum = display.textContent
        }*/
      }
      

    if (action === 'operator') {
      if (firstNum && previousKey !== 'operator' && previousKey !== 'calculate') {
        previousNum = display.textContent;
        display.textContent = calculate(firstNum, operatorForAdvanced, previousNum);
      }
      operatorForAdvanced = buttonContent;
      firstNum = display.textContent;
      previousKey = 'operator';
    }

    if (action === 'decimal') {
      if (!display.textContent.includes('.') && previousKey !== 'operator') {
        display.textContent = display.textContent + ".";
      }
      else if (previousKey === 'operator') {
        display.textContent = '0.';
      }
      previousKey = 'decimal'
    }

    if (action === 'clear') {
      display.textContent = "0";
      firstNum = 0;
      operatorForAdvanced = undefined;
      previousNum = 0;
      previousKey = 'clear';
    }

    if (action === 'calculate') {
      if (firstNum) {
        if (previousKey === 'calculate') {
          firstNum = display.textContent;
          display.textContent = calculate(firstNum, operatorForAdvanced, previousNum)
        } 
        else {
          previousNum = display.textContent;
          display.textContent = calculate(firstNum, operatorForAdvanced, previousNum);
        }
      }
        previousKey = 'calculate';
    } 
  }

}); 