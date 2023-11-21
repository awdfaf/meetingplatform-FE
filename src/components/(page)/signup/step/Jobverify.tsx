'use client'

import React, { useState } from 'react'
import CertTimer from '../../login/CertTimer';
import { SignupType } from '@/types/SignupType';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

interface PhoneInputProps {
  // 다른 프로퍼티 정의
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

function Jobverify({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {

  const [verify, setVerify] = useState<any>(false)
  const [remainingTime, setRemainingTime] = useState<any>(50);
  const [codeInput, setCodeinput] = useState<string>('');
  const router = useRouter();

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

  const handleVerify=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value}=e.target;
    setCodeinput(value);
  }

  const handleResend = () => {
    if (verify) { // 인증번호 재전송을 누를 때 verify를 false로 설정
    setRemainingTime(180);
    } // 인증번호 재전송을 누를 때 remainingTime을 180으로 초기화
  };

  const emailsend = async () => {
    console.log(signUpData.companyEmail)
    if(signUpData.companyEmail === "" || signUpData.companyEmail === undefined){
      Swal.fire({
        text: `이메일을 입력해주세요.`,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "my-swal",
        },
      });
      return;
    } else {
      // 유효성 검사 (예시: 이메일 형식)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signUpData.companyEmail)) {
        Swal.fire({
          text: `유효한 이메일 주소를 입력하세요.`,
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            container: "my-swal",
          },
        });
        return;
      }
    }
    try {
        const response = await fetch(`https://moa-backend.duckdns.org/api/v1/user/verify/email-send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({companyEmail:signUpData.companyEmail}),
        });
        const data = await response.json();
        console.log(data);
        if(data.isSuccess){
          setVerify(true);
          Swal.fire({
            text: `인증번호를 전송하였습니다.`,
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              container: "my-swal",
            },
          });
        }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const emailconfirm = async (e:any) => {
    e.preventDefault();
    console.log(signUpData.companyEmail, codeInput)
    try {
        const response = await fetch('https://moa-backend.duckdns.org/api/v1/user/verify/email-confirm',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        companyEmail:signUpData.companyEmail,
        code: codeInput,
      }),
    });
    
        const data = await response.json();
        console.log(data);
        setActive(
          {
            ...active,
            [stepId-1]: {
              id: stepId,
              status: data.isSuccess,
            },
          }
        )
        if(data.isSuccess){
          setSignUpData({
            ...signUpData,
            companyId: data.result.id,
            companyName: data.result.companyName,
          });
          Swal.fire({
            text: `인증이 완료되었습니다.`,
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              container: "my-swal",
            },
          });
      } else {
        Swal.fire({
          text: `인증번호가 일치하지 않습니다.`,
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            container: "my-swal",
          },
        });
      }
    } catch (error) {
        console.error("Error sending POST request:", error);
    }
  } 

  return (
    <main className='container mt-10 mb-5'>
      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>직장 인증</p>
        <p className="text-xs text-center text-gray-500">회사 이메일 혹은 재직증명서로 인증을 진행해주세요.</p>
      </div>
      <div className={verify ? 'flex flex-col justify-center items-center relative opacity-50' : 'flex flex-col justify-center items-center relative'}>
        <div className='flex justify-between items-end gap-2 md:w-[80%] w-full'>
          <div className='flex flex-col mt-3 justify-start w-2/3 transition-all'>
            <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>인증받을 이메일을 입력하세요.</label>
            <input 
              name="companyEmail"
              type='email'
              className={verify ? 'cursor-not-allowed border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]' : 'border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'}
              onChange={handleOnChange}
              placeholder='이메일을 입력해주세요.'
              disabled={verify}
              defaultValue={signUpData.companyEmail}
            />
          </div>
          <button
            type="button"
            className={verify ? 'cursor-not-allowed bg-gray-400 text-white text-xs rounded-full w-1/3 px-6 h-[50px]': 'bg-[#f7852e] text-white text-xs rounded-full w-1/3 px-6 h-[50px]'}
            onClick={emailsend}
            disabled={verify}
          >
            인증
          </button>
        </div>
      </div>
      {
        verify ? 
        <div className='flex flex-col justify-center items-center relative'>
        <div className='flex justify-between items-end gap-2 md:w-[80%] w-full'>
          <div className='flex flex-col mt-3 justify-start w-2/3 transition-all relative'>
            <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>인증번호를 입력하세요.</label>
            <input 
              name="verifyCode"
              type='text'
              className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
              onChange={handleVerify}
              placeholder='인증번호를 입력해주세요.'
            />
            <CertTimer
              verify={verify}
              remainingTime={remainingTime}
              setRemainingTime={setRemainingTime}
              setVerify={setVerify}
              // handleResend={handleResend}
            />
          </div>
          <button
            type="button"
            className='bg-[#f7852e] text-white text-xs rounded-full w-1/3 px-6 h-[50px]'
            onClick={emailconfirm}
          >
            인증 확인
          </button>
        </div>
      </div>
      : null
      }
      <hr className='my-10 md:w-[80%] m-auto' />
      <div className='flex justify-center mt-10'>
        <button 
          onClick={()=>router.push('/signup?step=5')}
          className='w-full md:w-[80%] h-[50px] text-sm rounded-md bg-slate-100 border-2 border-[#4338ca] text-[#4338ca] opacity-60'>
          회사 이메일이 없습니다.
        </button>
      </div>
    </main>
  )
}

export default Jobverify