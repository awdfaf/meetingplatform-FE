'use client'

import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Inquirylayout({ children }:
  { children: React.ReactNode },) {

  const pathname = usePathname()
  return (
    <>
      <div className='mt-5'>
        <BackbuttonHeader contents='아이디·비밀번호 찾기' />
        <div className='flex mt-3'>
          <div className={pathname === '/findIdPw' ? `w-1/2 h-10 leading-10 text-center border-[1px] font-semibold border-b-[#4338ca] border-b-[3px]` : `w-1/2 h-10 leading-10 border-[1px] text-center`}>
            <a href='/findIdPw'>
              아이디 찾기
            </a>
          </div>

          <div className={pathname === '/findIdPw/findPw' ? `w-1/2 h-10 leading-10 text-center  font-semibold border-[1px] border-b-[#4338ca] border-b-[3px]` : `w-1/2 h-10 leading-10 text-center border-[1px]`}>
            <a href='/findIdPw/findPw'>
              비밀번호 찾기
            </a>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}