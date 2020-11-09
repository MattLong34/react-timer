import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer'

function App() {
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [intervalID, setIntervalID] = useState(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');

  useEffect(() => {
      setTimeLeft(sessionLength)
  }, [sessionLength]);

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

  const isStarted = intervalID !== null;
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

  return (
    <div className="App">
        <Break 
          breakLength={breakLength}
          decreaseBreakLengthByOneMinute={decreaseBreakLengthByOneMinute}
          increaseBreakLengthByOneMinute={increaseBreakLengthByOneMinute}
        />
        <Timer 
          timerLabel={currentSessionType}
          handleStartStopClick={handleStartStopClick}
          startStopButtonLabel={isStarted? 'Stop' : 'Start'}
          timeLeft={timeLeft}
        />
        <Session 
          sessionLength={sessionLength}
          decreaseSessionLengthByOneMinute={decreaseSessionLengthByOneMinute}
          increaseSessionLengthByOneMinute={increaseSessionLengthByOneMinute}
        />
    </div>
  );
}

export default App;
