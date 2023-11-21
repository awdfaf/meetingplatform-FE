import React, { useState, ChangeEvent, useEffect } from 'react';

interface CertTimerProps {
  verify: boolean;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

function CertTimer({ verify, remainingTime, setRemainingTime }: CertTimerProps) {
  useEffect(() => {
    if (verify) {
      let intervalId: NodeJS.Timeout;

      if (verify && setRemainingTime) {
        intervalId = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [verify, setRemainingTime]);

  const formatTime = (timeInSeconds: number) => {
    if (timeInSeconds <= 0) {
      return '시간이 만료되었으니 새로운 인증번호를 받아주세요.';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return verify && remainingTime >= 0 ? (
    <p>{`남은 시간: ${formatTime(remainingTime)}`}</p>
  ) : null;
}

export default CertTimer;