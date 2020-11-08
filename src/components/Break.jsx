import React from 'react'
import { useState } from 'react'
import moment from 'moment'

const Break = () => {
    const [breakLength, setBreakLength] = useState(60 * 5);

    const decreaseBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;

        if (newBreakLength < 0) {
            setBreakLength(0);
        } else {
            setBreakLength(newBreakLength);
        }
    };

    const increaseBreakLengthByOneMinute = () => {
        setBreakLength(breakLength + 60);
    };

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
