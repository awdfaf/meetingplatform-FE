'use client'

import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'

function PwInput(props: {signUpData: SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>, active: any, setActive: React.Dispatch<React.SetStateAction<any>>, stepId: number}) {

  const { signUpData, setSignUpData } = props;
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);


  const handlePasswordChange = (value: string) => {
    // 유효성 검사 (숫자, 영어, 특수문자 포함, 8~12 글자)
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,12}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('숫자, 영어, 특수문자를 포함하여 8~12글자로 작성하세요.');
    } else {
      setPasswordError(null);
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    if (value !== signUpData.password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(null);
    }
  }


  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;

    if (name === 'userPassword') {
      handlePasswordChange(value);
    } else if (name === 'checkPassword') {
      handleConfirmPasswordChange(value);
    }

    setSignUpData({
      ...signUpData,
      [name]: value,
    });

    if (passwordError || confirmPasswordError) {
      return;
    } else {
      props.setActive({
        ...props.active,
        [props.stepId-1]: {
          id: props.stepId,
          status: true,
        },
      })
    }

  }
  
  return (
    
    <main className='container mt-10 mb-5'>
      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.8rem] bg-white -mb-3 ml-5 z-50 w-fit px-2'>암호를 설정해주세요.</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.7rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="password"
            name="userPassword"
            onChange={handleOnChange}
            defaultValue={signUpData.password}
          />
          {passwordError && (
          <p className="text-red-500 text-xs mt-1 mb-3 ml-5 text-left">{passwordError}</p>
          )}
        </div>
        <div className='flex flex-col mt-3 justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.8rem] bg-white -mb-3 ml-5 z-50 w-fit px-2'>한번더 입력해주세요.</label>
          <input 
            type="password"
            name="checkPassword"
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            onChange={handleOnChange}
            defaultValue={signUpData.checkPassword}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-xs mt-1 ml-5 text-left">{confirmPasswordError}</p>
          )}
        </div>
      </div>
    </main>
  )
}

export default PwInput