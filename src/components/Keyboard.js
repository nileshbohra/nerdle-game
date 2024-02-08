import React, { useEffect, useCallback } from 'react';
import '../style/keyboard.css';
import nerdleConfig from '../nerdle.config';

const Keyboard = ({ boardData, handleKeyPress }) => {
    let keys = nerdleConfig.keys;
    if (boardData && boardData.solution.length === 12 && keys[1].length === 7) {
        keys[1].splice(keys[1].length - 2, 0, ...['(', ')', '^2', '^3']);
    }
    if (boardData && boardData.solution.length !== 12 && keys[1].length > 7) {
        keys[1].splice(keys[1].length - 6, 4);
    }
    const handleKeyBoard = useCallback((event) => {
        handleKeyPress(event.key)
    }, [handleKeyPress])
    useEffect(() => {
        document.addEventListener('keydown', handleKeyBoard);

        return () => {
            document.removeEventListener('keydown', handleKeyBoard)
        }
    }, [handleKeyBoard])


    return (
        <div className="keyboard-rows" >
            {keys.map((item, index) => {
                let keyRowStyle = '';
                if (index === 1) {
                    keyRowStyle = 'keyBoardArithmeticRow';
                }
                return <div className="keyBoardRow" key={index} onKeyDown={handleKeyBoard} >
                    {item.map((key, keyIndex) => {
                        key = key.toString();
                        return <div
                            key={keyIndex}
                            className={`nBtn ${keyRowStyle} ${boardData && boardData.correctCharArray.includes(key)
                                ? 'key-correct'
                                : boardData && boardData.presentCharArray.includes(key)
                                    ? 'key-present'
                                    : boardData && boardData.absentCharArray.includes(key)
                                        ? 'key-absent'
                                        : ''
                                } `}
                            onClick={() => {
                                handleKeyPress(key);
                            }}
                        >
                            {key}
                        </div>
                    })}
                </div>
            })}
        </div>
    );
};

export default Keyboard;
