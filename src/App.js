import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Button } from 'react-bootstrap';


function App() {
  const audioElement = useRef(null)
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [intervalID, setIntervalID] = useState(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [testMode, setTestMode] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // const shortBreak = (60 * 5);
  // const longBreak = (60 * 10);
  // const testShortBreak = (60 * 1);
  // const testLongBreak = (60 * 2);

  useEffect(() => {
      setTimeLeft(sessionLength)
  }, [sessionLength]);

  useEffect(() => {
    if (testMode === false && sessionsCompleted === 4) {
      setSessionsCompleted(0)
      setBreakLength(60 * 10)
    } else if (testMode === false && sessionsCompleted !== 4) {
      setBreakLength(60 * 5)
    } else if (testMode === true && sessionsCompleted === 4) {
      setSessionsCompleted(0)
      setBreakLength(60 * 2)
    } else if (testMode === true && sessionsCompleted !== 4) {
      setBreakLength(60 * 1)
    }
  }, [sessionsCompleted]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioElement.current.play()
      if (currentSessionType === 'Session') {
        setCurrentSessionType('Break')
        addSessionToCompleted()
        setTimeLeft(breakLength)
      } else if (currentSessionType === 'Break') {
        setCurrentSessionType('Session')
        setTimeLeft(sessionLength)
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft])

  // useEffect(() => {
  //   if (sessionsCompleted > 0 && sessionsCompleted % 4 === 0) {
  //     setSessionsCompleted(0)
  //     setBreakLength(breakLength * 2)
  //     console.log("session divisible by 4 - break length", breakLength)
  //   } else if (sessionsCompleted > 0 && sessionsCompleted % 4 != 0) {
  //     setBreakLength(breakLength / 2)
  //     console.log("session not divisible by 4 - break length", breakLength)
  //   }
  // }, [sessionsCompleted])

  // const testMode = false;

  // const setTestMode = () => {
  //   const testMode = true
  // };


  // useEffect(() => {
  //   if (testMode === true && sessionsCompleted === 4) {
  //     setSessionsCompleted(0)
  //     setBreakLength(testLongBreak)
  //   } else if (testMode === true && sessionsCompleted != 4) {
  //     setBreakLength(testShortBreak)
  //   }
  // }, [sessionsCompleted]);

  const decreaseSessionLengthByOneMinute = () => {
      const newSessionLength = sessionLength - (60 * 5);

      if (newSessionLength < (60 * 5)) {
          setSessionLength(60 * 5);
      } else {
          setSessionLength(newSessionLength);
      }
  };

  const increaseSessionLengthByOneMinute = () => {
      setSessionLength(sessionLength + (60 * 5));
  };


  const decreaseBreakLengthByOneMinute = () => {
      const newBreakLength = breakLength - (60 * 5);

      if (newBreakLength <= (60 * 5)) {
          setBreakLength(60 * 5);
      } else {
          setBreakLength(newBreakLength);
      }
  };

  const increaseBreakLengthByOneMinute = () => {
      setBreakLength(breakLength + (60 * 5));
  };

  const addSessionToCompleted = () => {
    setSessionsCompleted(sessionsCompleted + 1)
  }

  const isStarted = intervalID !== null;
  const handleStartStopClick = () => {
    if (isStarted){
        clearInterval(intervalID)
        setIntervalID(null)
    } else {
        const newIntervalID = setInterval(() => {
            setTimeLeft(previousTimeLeft => previousTimeLeft -1)
        }, speed);
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
    // const testMode = false
    setTestMode(false)
    console.log("testMode false", testMode)
  }
  const handleLudicrousModeButton = () => {
    audioElement.current.load()
    clearInterval(intervalID)
    setIntervalID(null)
    setCurrentSessionType('Session')
    // setSpeed(100)
    if (speed === 1000) {
      setSpeed(50)
    } else {
      setSpeed(1000)
    }
  }
  // const handleTestModeButton = () => {
  //   audioElement.current.load()
  //   clearInterval(intervalID)
  //   setIntervalID(null)
  //   setCurrentSessionType('Session')
  //   setSessionLength(60 * 1)
  //   setBreakLength(60 * 1)
  //   setTimeLeft(60 * 1)
  //   setTestMode(true)
  //   console.log("test mode true", testMode)
  // }
  return (
    <div className="App">
      <div className="pomodoro">

      <Timer 
        timerLabel={currentSessionType}
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted? 'Stop' : 'Start'}
        timeLeft={timeLeft}
        />
        <div className="labels-row">
          <Break 
            breakLength={breakLength}
            decreaseBreakLengthByOneMinute={decreaseBreakLengthByOneMinute}
            increaseBreakLengthByOneMinute={increaseBreakLengthByOneMinute}
            />
          <Session 
            sessionLength={sessionLength}
            decreaseSessionLengthByOneMinute={decreaseSessionLengthByOneMinute}
            increaseSessionLengthByOneMinute={increaseSessionLengthByOneMinute}
            />
        </div>
        <div className="settings-row">
          <button className="button-large" onClick={handleResetButton}>Reset Settings</button>
          <button className="button-large" onClick={handleLudicrousModeButton}>Ludicrous Mode</button>
        </div>
      <audio id="sound" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/harp-strumming.mp3" type="audio/mpeg" />
      </audio>
      <p>Sessions Completed: {sessionsCompleted}/4</p>
        </div>
    </div>
  );
}

export default App;
