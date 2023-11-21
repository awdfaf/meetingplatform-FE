'use client'

import PhoneInput from '@/components/(page)/login/PhoneInput'
import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'



function FindIdPw() {
/*   const [signUpData,setSignUpData]=useState<SignupType>({
    userId : "", 
    userPassword : "",
    checkPassword :"",
    phoneNumber : "",
    phoneCert : false,
  }) */
  return (
    <>
    <main className='grid place-items-center mt-10'>

      <div className='w-[290px] font-semibold'>
        <p className='text-xl py-3'>아이디를 찾으시려면</p>
        <p className='text-xl pb-3'><span className='text-[#4338ca]'>휴대폰 번호</span>로 인증해주세요</p>
      </div>

      <div className='mt-10'>
      <p>이름</p>
      <input type="text"  id="name" className='w-[290px] rounded-xl' placeholder='이름 입력'/>
      </div>

      <div className='flex gap-3 w-[290px] mb-5 py-5'>
        <div>
          <p> 성별 <span className="hidden">필수항목</span></p>
          <select name="gender" id="gender">
            <option value="M" deta-id="gender">남자</option>
            <option value="W" deta-id="gender">여자</option>
          </select>
        </div>
        <div>
          <p>생년월일</p>
          <input type="text" className='w-[190px] rounded-xl'/>
        </div>
      </div>

      <div>
      <p>휴대폰 번호</p>
      <PhoneInput setRemainingTime={function (value: React.SetStateAction<number>): void {
        throw new Error('Function not implemented.');
        }
        }
      />
      </div>

    </main>
    </>
  )
}

export default FindIdPw