import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function padding(number) {
  return ('00' + number).slice(-2);
}
function App() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoursDiff, setHoursDiff] = useState('0');
  const [minutesDiff, setMinutesDiff] = useState('0');
  const [secondsDiff, setSecondsDiff] = useState('0');
  const [nextPausa, setNextPausa] = useState('9:00');

  const nextBreakDate = new Date();
  const currentHour = currentDate.getHours();

  useInterval(() => {
    setCurrentDate(new Date());
    if (currentHour < 9 || currentHour >= 16) {
      setNextPausa('9:00');
      nextBreakDate.setDate(nextBreakDate.getDate() + 1);
      nextBreakDate.setHours(9);
    } else if (currentHour > 9 && currentHour < 11) {
      nextBreakDate.setHours(11);
      setNextPausa('11:00');
    } else if (currentHour > 11 && currentHour < 16) {
      nextBreakDate.setHours(16);
      setNextPausa('16:00');
    }



    nextBreakDate.setMinutes(0);
    nextBreakDate.setSeconds(0);
    nextBreakDate.setMilliseconds(0);


    const timeDiff = ((nextBreakDate - currentDate)) / 1000;
    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff - (hours * 3600)) / 60);
    const seconds = Math.floor(timeDiff - (hours * 3600) - (minutes * 60));


    setHoursDiff(padding(hours));
    setMinutesDiff(padding(minutes));
    setSecondsDiff(padding(seconds));
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Amici di pausa!</h1>
        <h3>Prossima pausa alle {nextPausa}</h3>
        {hoursDiff}:{minutesDiff}:{secondsDiff}
      </header>
    </div>
  );
}

export default App;
