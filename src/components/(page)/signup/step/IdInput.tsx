'use client'

import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'
import { useSearchParam } from 'react-use';
import Swal from 'sweetalert2';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

function IdInput({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {

  const [error, setError] = useState<string | null>(null);
  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

        // 유효성 검사 (예시: 이메일 형식)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError('유효한 이메일 주소를 입력하세요.');
        } else {
          setError(null);
        }

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

    const checkId = async (e:any) => {
      e.preventDefault();
      console.log(signUpData.loginId)
      try {
          const response = await fetch(`https://moa-backend.duckdns.org/api/v1/user/id-check?id=${signUpData.loginId}`);
          const data = await response.json();
          console.log(data);
          console.log(stepId)
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
            Swal.fire({
              text: `사용 가능한 이메일입니다.`,
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
              text: `이미 사용중인 이메일입니다.`,
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
      {/* <h1 className='text-md text-bold text-center mb-10'>이메일을 입력해주세요.</h1> */}
      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>모아 회원가입</p>
        <p className="text-xs text-center text-gray-500">자주 사용하시는 메일을 입력하실 것을 추천드립니다.</p>
      </div>
      <form onSubmit={checkId} className='flex justify-center gap-3 items-center'>
        <input
          className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full w-[250px] h-[40px] px-3 placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
          type="text"
          name="loginId"
          placeholder="이메일을 입력해주세요."
          onChange={handleOnChange}
          defaultValue={signUpData.loginId}
        />
        <button
          type="submit"
          className='bg-[#f7852e] text-white text-xs rounded-full w-[80px] h-[40px]'
        >
          중복확인
        </button>
      </form>
    </main>
  )
}

export default IdInput