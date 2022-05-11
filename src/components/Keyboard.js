import React, { useEffect, useCallback } from 'react';
import '../style/keyboard.css';
import nerdleConfig from '../nerdle.config';

const Keyboard = ({ boardData, handleKeyPress }) => {
    const keys = nerdleConfig.keys;
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
                return <div className="row" key={index} onKeyDown={handleKeyBoard} >
                    {item.map((key, keyIndex) => {
                        key = key.toString();
                        return <button
                            key={keyIndex}
                            className={`${boardData && boardData.correctCharArray.includes(key)
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
                        </button>
                    })}
                </div>
            })}
        </div>
    );
};

export default Keyboard;
