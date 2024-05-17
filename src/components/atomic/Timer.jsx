import React, { useState, useEffect } from 'react';

function Timer({checked}) {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {

    const timerId = setInterval(() => {
        if(checked){
            setTotalSeconds((prevSeconds) => prevSeconds + 1);

        }
    }, 1000);

    return () => clearInterval(timerId);
  }, [checked]);

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

export default Timer