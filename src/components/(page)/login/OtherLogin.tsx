'use client'

import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Loginarea from './LoginArea'

export default function OtherLogin() {

  const query = useSearchParams();
  const callBackUrl = query?.get('callbackUrl');


  const handleLogin = async (provider: string) => {
    
    const result = await signIn(provider, {
        redirect: true,
        callbackUrl: callBackUrl ? callBackUrl : '/'
    })

  };
  
  return (
    <div>
      <div className='pb-[40px]'>
        <ul className='grid place-items-center'>
          <li>
            <button onClick={() => handleLogin('naver')} title="새창 열림"
            className='bg-[#03c75a] py-2 w-[300px] rounded-full font-semibold text-white'>
              <span className='text-sm'>네이버 계정으로 로그인하기</span>
            </button>
          </li>

          <li className='pt-4'>
            <button onClick={() => handleLogin('google')} title="새창 열림"
          className='bg-[#3d81e7] py-2 w-[300px] rounded-full font-semibold text-white'>
            <span className='text-sm'>구글 계정으로 로그인하기</span>
          </button>
          </li>

          <div className="relative text-center mt-6">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
            OR
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div>
        <Loginarea/>
        </ul>
      </div>
    </div>
  )
}