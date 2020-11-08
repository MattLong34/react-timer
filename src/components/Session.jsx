import React from 'react'
import { useState } from 'react'
import moment from 'moment'

const Session = () => {
    const [sessionLength, setSessionLength] = useState(60 * 25);

    const decreaseSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;

        if (newSessionLength < 0) {
            setSessionLength(0);
        } else {
            setSessionLength(newSessionLength);
        }
    };

    const increaseSessionLengthByOneMinute = () => {
        setSessionLength(sessionLength + 60);
    };

    const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes()
    return (
        <div>
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <button id="session-decrease" onClick={decreaseSessionLengthByOneMinute}>-</button>
            <button id="session-increase" onClick={increaseSessionLengthByOneMinute}>+</button>
        </div>
    );
};

export default Session;
