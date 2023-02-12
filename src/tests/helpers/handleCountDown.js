import React, { useState, useEffect } from "react";

const CountDown = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds === 0) {
        clearInterval(countdown);
      }
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <h4>{seconds}</h4>
  );
};

export default CountDown;
