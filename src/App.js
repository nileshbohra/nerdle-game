import React, { useState, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import { evaluate } from 'mathjs';
import ModeSelect from './components/ModeSelect';
import Board from './components/Board';

import nerdleConfig from './nerdle.config';

const App = () => {
  const equationList = nerdleConfig.equationList;
  const [isDark, setIsDark] = useState(false);
  const [boardData, setBoardData] = useState(null);
  const [message, setMessage] = useState(null);
  const [equationArray, setEquationArray] = useState([]);
  const [msgIsError, setMsgIsError] = useState(false);
  //this is for dropdown
  const [col, setCol] = useState(8);
  //this is for column blocks
  const [colArr, setColArr] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  useEffect(() => {
    setupgame();
  }, []);

  const setupgame = (colNo) => {
    const boardCol = colNo || col;
    //this will store random equation from equationlist according to board column lenght.
    var eqIndex = Math.floor(Math.random() * equationList[boardCol].length);
    let newBoardData = {
      ...boardData,
      solution: equationList[boardCol][eqIndex],
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentCharArray: [],
      absentCharArray: [],
      correctCharArray: [],
      status: 'IN_PROGRESS',
    };
    setBoardData(newBoardData);
  };

  const handleMessage = (message, msgType) => {
    if (msgType === 'error') {
      setMsgIsError(true);
    } else {
      setMsgIsError(false);
    }
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };


  const checkEquation = (equation) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    //code from imKennyYip
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < solution.length; i++) {
      let letter = solution[i];
      if (letterCount[letter]) {
        letterCount[letter] += 1;
      }
      else {
        letterCount[letter] = 1;
      }
    }

    //first iteration, check all the correct ones first
    for (var index = 0; index < solution.length; index++) {
      if (solution.charAt(index) === equation.charAt(index)) {
        matchCount++;
        rowStatus.push('correct');
        correct += 1;
        letterCount[equation.charAt(index)] -= 1;
        correctCharArray.push(equation.charAt(index));
      } else {
        rowStatus.push('checking');
      }
    }
    //go again and mark which ones are present but in wrong position
    for (let index = 0; index < solution.length; index++) {
      if (rowStatus[index] !== 'correct') {
        console.log(rowStatus[index]);
        if (solution.includes(equation.charAt(index)) && letterCount[equation.charAt(index)] > 0) {
          rowStatus[index] = 'present';
          letterCount[equation.charAt(index)] -= 1;
          presentCharArray.push(equation.charAt(index));
        } else {
          rowStatus[index] = 'absent';
          absentCharArray.push(equation.charAt(index));
        }
      }
    }

    //checks if the equation is correct
    if (matchCount === parseInt(col)) {
      status = 'WIN';
      handleMessage('🎉YOU WON', 'success');
    } else if (rowIndex + 1 === 6) {
      status = 'LOST';
      handleMessage('You Lost, the correct calculation was : ' + boardData.solution, 'error');
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = equation;
    let newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      presentCharArray: presentCharArray,
      absentCharArray: absentCharArray,
      correctCharArray: correctCharArray,
    };
    setBoardData(newBoardData);
  };

  //this will be call everytime player enters a number in equatoin
  const enterCurrentText = (equation) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = equation;
    let newBoardData = { ...boardData, boardWords: boardWords };
    setBoardData(newBoardData);
  };

  /* --------------------------- keyboard functions --------------------------- */
  const onEnter = () => {
    let expression = ''; // will store expression 
    let eqResult = '';
    if (equationArray.length === parseInt(col)) {
      let equation = equationArray.join('').toLowerCase();
      if (equationArray.includes('=')) {
        for (let i = 0; i < equationArray.length; i++) {
          let number = equationArray[i]
          if (number === '=') {
            for (let j = i; j < equationArray.length; j++) {
              if (equationArray[j] === '=') continue;
              //store result
              eqResult = eqResult + equationArray[j];
            }
            break;
          } else {
            //store expression on left side of '=' sign
            expression = expression + number;
          }
        }
        if (!(evaluate(expression) === parseInt(eqResult))) {
          handleMessage("That guess doesn't compute!", 'error');
        } else {
          checkEquation(equation);
          setEquationArray([]);
        }
      } else {
        handleMessage("That guess doesn't compute!", 'error');
      }
    }
    else {
      handleMessage('Incomplete row', 'error');
    }
  }

  const onDelete = () => {
    equationArray.splice(equationArray.length - 1, 1);
    setEquationArray([...equationArray]);
  }

  const handleKeyPress = (key) => {
    if (typeof key === 'string') key = key.toUpperCase();
    if (boardData.rowIndex > 5 || boardData.status === 'WIN') return;
    if (key === 'ENTER') {
      onEnter();
      return;
    } else if (key === '⌫' || key === 'BACKSPACE') {
      onDelete();
    } else if (equationArray.length < col) {
      if (isNaN(key) && key !== ['+', '-', '/', '*', '='].find(val => val === key)) return;
      equationArray.push(key);
      setEquationArray([...equationArray]);
    }
    enterCurrentText(equationArray.join('').toLowerCase());
  };

  const handleTheme = () => {
    setIsDark(preVal => { console.log(preVal); return !preVal });
  }

  return (
    <div className="container" style={isDark ? nerdleConfig.theme.dark : nerdleConfig.theme.default}>
      <div className="top">
        <div className="title" style={isDark ? { color: 'white' } : null}>nerdle. {col === '5' && 'mini'}</div>
        <div className="setting">
          <ModeSelect setCol={setCol} setColArr={setColArr} setupgame={setupgame} col={col} />
          <button className="reset-board" onClick={() => setupgame()}>
            Play again
          </button>
          <button className="reset-board" style={isDark ? nerdleConfig.theme.default : nerdleConfig.theme.dark} onClick={() => handleTheme()}>
            {isDark ? 'go light 🔆' : 'go dark 🌙'}
          </button>
        </div>
      </div>

      {message && <div className="message" style={msgIsError ? nerdleConfig.theme.msgColor.error : nerdleConfig.theme.msgColor.success}>{message}</div>}
      {col && (
        <>
          <Board colArr={colArr} boardData={boardData} />
          <div className="bottom">
            <Keyboard boardData={boardData} handleKeyPress={handleKeyPress} onEnter={onEnter} onDelete={onDelete} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
