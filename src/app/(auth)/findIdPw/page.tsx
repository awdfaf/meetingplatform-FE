'use client'

import PhoneInput from '@/components/(page)/login/PhoneInput'
import { SignupType } from '@/types/SignupType'
import React, { useState } from 'react'



function FindIdPw() {
  return (
    <>
    <main className='container mt-10 mb-5'>
      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>아래의 내용을 작성해 주세요</p>
        <p className="text-xs text-center text-gray-500">이름과 생년월일, 닉네임이 일치하면 아이디를 찾을 수 있습니다.</p>
      </div>
      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>이름을 입력해주세요.</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="password"
            name="password"
            />
        </div>
        <div className='flex flex-col mt-3 justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>생년월일을 입력해주세요.</label>
          <input 
            type="password"
            name="checkPassword"
            placeholder='20230101과 같은 8자리'
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
          />
        </div>

        <div className='flex flex-col mt-3 justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>닉네임을 입력해주세요.</label>
          <input 
            type="password"
            name="checkPassword"
            placeholder='3~7자리'
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
          />
        </div>

        <button 
        className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full w-full mt-20 md:w-[80%]'
        >확인</button>
      </div>

   
    </main>
    </>
  )
}

export default FindIdPw