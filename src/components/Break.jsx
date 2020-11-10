import React from 'react'
import moment from 'moment'

const Break = ({
    breakLength,
    decreaseBreakLengthByOneMinute,
    increaseBreakLengthByOneMinute
}) => {
    const breakLengthInMinutes = moment.duration(breakLength, 's').minutes();
    return (
        <div>
            <p className="type-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}m</p>
            <button className="button-small" id="break-decrease" onClick={decreaseBreakLengthByOneMinute}>-</button>
            <button className="button-small" id="break-increase" onClick={increaseBreakLengthByOneMinute}>+</button>
        </div>
    );
};

export default Break;
