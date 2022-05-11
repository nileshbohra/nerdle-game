import React from 'react'

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
            <option value={5}>mini</option>
            <option value={8}>classic</option>
        </select>
    )
}
