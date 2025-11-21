import  { useState, useEffect } from 'react';

const CountdownCounter = ({ targetDate}:{targetDate:number, setPay?:()=>void}) => {
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(targetDate - currentTime, 0);
      setCountdown(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);




  // Convert milliseconds to readable format (hh:mm:ss)
  const formatTime = (time:number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="text-[#808191]">{formatTime(countdown)}</div>;
};

export default CountdownCounter;
