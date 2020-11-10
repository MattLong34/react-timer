import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const Timer = ({
    handleStartStopClick,
    timerLabel,
    startStopButtonLabel,
    timeLeft
}) => {

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div>
            <p id="timer-label">{timerLabel}</p>
            <p id="time-left">{formattedTimeLeft}</p>
            <button className="button-large" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
        </div>
    )
};

export default Timer;
