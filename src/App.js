import { useState, useEffect } from 'react';

function App() {
  const [timeRemaining, setTimeRemaining] = useState(25*60);
  const [inProgress, setInProgress] = useState(false);
  const [curr, setCurr] = useState("focus"); // focus, short, long
  const [sessionNumber, setSessionNumber] = useState(0);

  useEffect(() => {
    console.log({inProgress})
    let timer;
    if (inProgress) {
      timer = setInterval(() => {
        setTimeRemaining((timeRemaining) => {
          if (timeRemaining <= 0) {
            if (curr == "focus" && sessionNumber >= 3) {
              setSessionNumber(0);
              setCurr("long");
              setInProgress(false);
              return 20*60;
            }
            else if (curr == "focus" && sessionNumber < 3 ) {
              setSessionNumber(sessionNumber + 1);
              setCurr("short");
              setInProgress(false);
              return 5*60;
            }
            else {
              setCurr("focus");
              setInProgress(false);
              return 25*60;
            }
          }
          else {
            return timeRemaining - 1;
          }
        });

      }, 1000);
  }
  return () => clearInterval(timer);
  }, [inProgress]);

  const handleSkip = () => {
    if (curr == "focus" && sessionNumber >= 3) {
      setSessionNumber(0);
      setCurr("long");
      setInProgress(false);
      setTimeRemaining(20*60);
    }
    else if (curr == "focus" && sessionNumber < 3 ) {
      setSessionNumber(sessionNumber + 1);
      setCurr("short");
      setInProgress(false);
      setTimeRemaining(5*60);
    }
    else {
      setCurr("focus");
      setInProgress(false);
      setTimeRemaining(25*60);
    }
  }

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60; 

  return (
    <div>
      <span> {minutes} {seconds} </span>
      <button onClick={() => handleSkip()}> Click to skip to next phase </button>
      <button onClick={() => setInProgress(true)}> Click to start </button>
      <button onClick={() => setInProgress(false)}> Click to pause </button>
    </div>

  );
}

export default App;
