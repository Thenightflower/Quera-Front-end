import { useState, useRef, useEffect } from "react";

export function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); 

  const resume = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
    resume(); 
  };

  useEffect(() => {
    resume(); 
    return () => stop();
  }, []);


  return { seconds, resume, stop, reset };
}
