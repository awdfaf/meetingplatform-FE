'use client'

import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import React from 'react'

function ChangePw() {
  return (
    <>
    <BackbuttonHeader contents='비밀번호 변경' />
    <main className='grid place-items-center'>      
    <div className='mt-10 text-xl py-3 font-semibold'>
    변경하실 비밀번호를 입력해주세요.
    <p className='text-sm mt-3 font-medium'>숫자,영어, 특수문자를 포함하여 8~12글자로 작성해주세요.</p>
  </div>

    <div className='mb-40'>
    <p>비밀번호</p>
      <input type="text"  id="name" className='w-[290px] rounded-xl' placeholder='비밀번호를 입력해주세요.'/>
      <p>비밀번호 확인</p>
      <input type="text"  id="name" className='w-[290px] rounded-xl' placeholder='비밀번호를 한번 더 입력해주세요.'/>
    </div>

    <button className='h-[44px] w-[300px] bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'>
      다음
    </button>
    </main>
    </>
  )
}

export default ChangePw