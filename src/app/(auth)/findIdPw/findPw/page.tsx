'use client'

import PhoneInput from '@/components/(page)/login/PhoneInput'
import React from 'react'

function page() {
  return (
    <>
    <main className='grid place-items-center mt-10'>

    <div className='w-[290px] font-semibold'>
        <p className='text-xl leading-10'>비밀번호를 찾으시려면</p>
        <p className='text-xl leading-10'><span className='text-[#4338ca]'>이메일과 휴대폰 번호</span>를 <br />입력해주세요</p>
      </div>
      <div className='mt-10'>
      <p>이름</p>
      <input type="text"  id="name" className='w-[290px] rounded-xl' placeholder='이름 입력'/>
      <p>이메일</p>
      <input type="text"  id="name" className='w-[290px] rounded-xl' placeholder='이메일 입력'/>
      </div>
      
      <div>
      <p>이메일</p>
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

export default page