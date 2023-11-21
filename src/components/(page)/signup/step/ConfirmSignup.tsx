'use client'
import { SignupType } from '@/types/SignupType';
import React, { useEffect, useState } from 'react'

interface ConfrimProps {
    signUpData: SignupType;
    setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
    active: any;
    setActive: React.Dispatch<React.SetStateAction<any>>;
    stepId: number;
}
function ConfirmSignup({ signUpData, setSignUpData, active, setActive, stepId }: ConfrimProps){

  return (
    <main className='container mt-10 mb-5'>
        <div className='tracking-tighter py-4'>
            <p className='text-lg'>회원가입이 완료되었습니다.</p>
            <p className='text-sm'>로그인 후 이용해주세요.
            </p>
        </div>
        <div className='px-3'>
        <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white' onClick={() => {window.location.href='/login'}}>로그인</button>
        </div>
    </main>
  )
}

export default ConfirmSignup