import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer'

function App() {
  const audioElement = useRef(null)
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [intervalID, setIntervalID] = useState(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
      setTimeLeft(sessionLength)
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement.current.play()
      if (currentSessionType === 'Session') {
        setCurrentSessionType('Break')
        setTimeLeft(breakLength)
      } else if (currentSessionType === 'Break') {
        setCurrentSessionType('Session')
        setTimeLeft(sessionLength)
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft])

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

  // const addSessionToCompleted = () => {
  //   setSessionsCompleted(sessionsCompleted + 1)
  // }

  // add counter here? if time left is zero
  // setSessionsCompleted(sessionsCompleted + 1)
  // addSessionToCompleted()
  // console.log("sessions completed", sessionsCompleted)
  const isStarted = intervalID !== null;
  const handleStartStopClick = () => {
    if (isStarted){
        clearInterval(intervalID)
        setIntervalID(null)
    } else {
        const newIntervalID = setInterval(() => {
            setTimeLeft(previousTimeLeft => previousTimeLeft -1)
        }, 100);
        setIntervalID(newIntervalID);
    }
};
  const handleResetButton = () => {
    audioElement.current.load()
    clearInterval(intervalID)
    setIntervalID(null)
    setCurrentSessionType('Session')
    setSessionLength(60 * 25)
    setBreakLength(60 * 5)
    setTimeLeft(60 * 25)
  }
  const handleTestModeButton = () => {
    audioElement.current.load()
    clearInterval(intervalID)
    setIntervalID(null)
    setCurrentSessionType('Session')
    setSessionLength(60 * 1)
    setBreakLength(60 * 1)
    setTimeLeft(60 * 1)
  }
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
        <button onClick={handleResetButton}>Reset Settings</button>
        <button onClick={handleTestModeButton}>Set Test Mode</button>
        <audio id="sound" ref={audioElement}>
          <source src="https://onlineclock.net/audio/options/harp-strumming.mp3" type="audio/mpeg" />
        </audio>
        <p>Sessions Completed: {sessionsCompleted}</p>
    </div>
  );
}

export default App;
