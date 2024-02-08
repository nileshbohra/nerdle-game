import React from 'react'
import nerdleConfig from '../nerdle.config';

export default function ModeSelect({ col, setCol, setColArr, setupgame }) {
    const handleChange = (event) => {
        const colNo = event.target.value;
        setCol(colNo);
        var arr = [];
        for (let i = 0; i < colNo; i++) arr.push(i);
        setColArr(arr);
        setupgame(colNo);
    };
    return (
        <select value={col} onChange={handleChange} placeholder="Select rows">
            {Object.keys(nerdleConfig.modes).map((mode) => (
                <option key={mode} value={nerdleConfig.modes[mode]}>
                    {mode}
                </option>
            ))}
        </select>
    )
}
