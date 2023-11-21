import { SignupType } from '@/types/SignupType'
import { input } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import NameInput from '../../login/PhoneInput';
import PhoneInput from '../../login/PhoneInput';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

function PhoneCert({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {

  return (
    <>
    <main className='mb-40 grid place-items-center '>

      <div className='text-xl py-3 font-semibold w-[280px]'>
        전화번호를 인증해 주세요.
        <p className='text-sm mt-3 font-medium'>본인명의의 휴대전화번호를 입력해주세요. </p>
      </div>

      <PhoneInput setRemainingTime={function (value: React.SetStateAction<number>): void {
          throw new Error('Function not implemented.');
        }}
        />

    </main>
    </>
  )
}

export default PhoneCert