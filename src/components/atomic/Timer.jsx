import React, { useState, useRef, useEffect } from 'react';

function Timer({ checked, totalSeconds, setTotalSeconds }) {
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Manage the timer start/stop based on the `checked` prop
  if (checked) {
    startTimer();
  } else {
    stopTimer();
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} hr`;

  return (
    <div>
      {formattedTime}
    </div>
  );
}

export default Timer;
