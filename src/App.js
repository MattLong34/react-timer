import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import Break from './components/Break'
import Session from './components/Session'

function App() {
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
  return (
    <div className="App">
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
  );
}

export default App;
