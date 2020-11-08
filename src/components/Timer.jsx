import React, { useState, useEffect } from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const Timer = ({
    breakLength,
    sessionLength
}) => {
    const [timeLeft, setTimeLeft] = useState(sessionLength);
    const [intervalID, setIntervalID] = useState(null);
    const [currentSessionType, setCurrentSessionType] = useState('Session');

    useEffect(() => {
        setTimeLeft(sessionLength)
    }, [sessionLength]);

    const isStarted = intervalID != null;

    const handleStartStopClick = () => {
        if (isStarted){
            clearInterval(intervalID)
            setIntervalID(null)
        } else {
            const newIntervalID = setInterval(() => {
                setTimeLeft(previousTimeLeft => {
                    const newTimeLeft = previousTimeLeft - 1;
                    if(newTimeLeft >= 0) {
                        return previousTimeLeft - 1
                    }
                    if(currentSessionType === 'Session') {
                        setCurrentSessionType('Break')
                        setTimeLeft(breakLength)
                    }
                    else if(currentSessionType === 'Break') {
                        setCurrentSessionType('Session')
                        setTimeLeft(sessionLength)
                    }
                });
            }, 100);
            setIntervalID(newIntervalID);
        }
    };

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div>
            <p id="timer-label">{currentSessionType}</p>
            <p id="time-left">{formattedTimeLeft}</p>
            <button onClick={handleStartStopClick}>{isStarted? 'Stop' : 'Start'}</button>
        </div>
    )
};

export default Timer;
