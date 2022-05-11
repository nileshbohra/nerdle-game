import React from 'react'

export default function Board({ colArr, boardData }) {
    return (
        <div className="cube">
            {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
                <div className={'cube-row '} key={rowIndex}>
                    {colArr.map((column, letterIndex) => (
                        <div
                            key={letterIndex}
                            className={`letter ${boardData && boardData.boardRowStatus[row]
                                ? boardData.boardRowStatus[row][column]
                                : ''
                                }`}
                        >
                            {boardData &&
                                boardData.boardWords[row] &&
                                boardData.boardWords[row][column]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
