import React from 'react'
 import moment from 'moment'

const Session = ({
    sessionLength, 
    decreaseSessionLengthByOneMinute,
    increaseSessionLengthByOneMinute
}) => {
    const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes()
    return (
        <div>
            <p className="type-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}m</p>
            <button className="button-small" id="session-decrease" onClick={decreaseSessionLengthByOneMinute}>-</button>
            <button className="button-small" id="session-increase" onClick={increaseSessionLengthByOneMinute}>+</button>
        </div>
    );
};

export default Session;
