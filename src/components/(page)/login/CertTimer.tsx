import React, { useState, ChangeEvent, useEffect } from 'react';
import Swal from 'sweetalert2';

interface CertTimerProps {
  verify: boolean;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

function CertTimer({ verify, remainingTime, setRemainingTime, setVerify }: CertTimerProps) {
  useEffect(() => {
    if (verify && remainingTime === 0) {
      setVerify(false);
      setRemainingTime(180);
      Swal.fire({
        text: `인증번호 입력 시간이 만료되었습니다.`,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: 'my-swal',
        },
      });
    }
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
  }, [verify, remainingTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return verify && remainingTime >= 0 ? (
    <p className='text-xs text-red-400 absolute right-7 top-7'>{`남은 시간: ${formatTime(remainingTime)}`}</p>
  ) : null;
}

export default CertTimer;