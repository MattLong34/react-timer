# Tesla Timer

> Use this Tesla-themed pomodoro timer to cruise through your work!

## Table of Contents

- [General Info](#general-info)
- [Sneak Peak](#sneak-peek)
- [Technologies](#technologies)
- [Setup](#setup)
- [Code Examples](#code-examples)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)
- [License](#license)

## General Info

Tesla Timer is a full-fledged pomodoro timer with style! Adjust your session and break times to your liking; a chime will play when it's time to take a break or start a new session.

Want to see Tesla Timer in action without waiting in real time? Launch Ludicrous Mode and watch the time blaze down at high speed!

## Sneak Peek

![Tesla Timer Image](https://i.imgur.com/mcc5qeV.png)

## Technologies

- HTML5
- CSS
- JavaScript
- React
- Moment.js

## Setup

Tesla Timer is live! Visit Tesla Timer out in the wild at https://react-timer-1.web.app today. No further setup required!

## Code Examples

```javaScript
const handleLudicrousModeButton = () => {
    audioElement.current.load()
    clearInterval(intervalID)
    setIntervalID(null)
    setCurrentSessionType('Session')
    if (speed === 1000) {
      setSpeed(50)
    } else {
      setSpeed(1000)
    }
  };
```

```javascript
const Session = ({
	sessionLength,
	decreaseSessionLengthByOneMinute,
	increaseSessionLengthByOneMinute,
}) => {
	const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();
	return (
		<div>
			<p className="type-label">Session</p>
			<p id="session-length">{sessionLengthInMinutes}m</p>
			<button
				className="button-small"
				id="session-decrease"
				onClick={decreaseSessionLengthByOneMinute}
			>
				-
			</button>
			<button
				className="button-small"
				id="session-increase"
				onClick={increaseSessionLengthByOneMinute}
			>
				+
			</button>
		</div>
	);
};
```

## Features

- Utilize the fully functional pomodoro timer
- Adjust session and break times as desired
- Take a longer break after completing four sessions
- Launch Ludicrous Mode to test the app's functionality in high speed

## Status

Version 1.0 is complete and deployed (https://react-timer-1.web.app)!

Future versions may include expanded functionality and design improvements.

## Contact

[Matt Long](https://www.linkedin.com/in/mattlong34/)

Feel free to contact me with any questions or suggestions!

## License

[Click to view](https://github.com/MattLong34/react-timer/blob/master/LICENSE.md)
