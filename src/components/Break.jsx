import React from 'react'
import moment from 'moment'

const Break = ({
    breakLength,
    decreaseBreakLengthByOneMinute,
    increaseBreakLengthByOneMinute
}) => {
    const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()
    return (
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <button id="break-decrease" onClick={decreaseBreakLengthByOneMinute}>-</button>
            <button id="break-increase" onClick={increaseBreakLengthByOneMinute}>+</button>
        </div>
    );
};

export default Break;
