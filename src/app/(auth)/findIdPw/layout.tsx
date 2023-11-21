'use client'

import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Inquirylayout({ children }:
  { children: React.ReactNode },) {

  const pathname = usePathname()
  return (
    <>
      <BackbuttonHeader contents='아이디·비밀번호 찾기' />
      <div className='flex'>
        <div className={pathname === '/login/findIdPw' ? `w-1/2 h-8 leading-8 text-center border-b-[3px] bg-[#eef2ff] font-semibold` : `w-1/2 h-8 leading-8 text-center`}>
          <a href='/login/findIdPw'>
            아이디 찾기
          </a>
        </div>

        <div className={pathname === '/login/findIdPw/findPw' ? `w-1/2 h-8 leading-8 text-center border-b-[3px] bg-[#eef2ff] font-semibold` : `w-1/2 h-8 leading-8 text-center`}>
          <a href='/login/findIdPw/findPw'>
            비밀번호 찾기
          </a>
        </div>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}