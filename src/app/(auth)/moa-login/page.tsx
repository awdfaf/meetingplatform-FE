import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '@/app/api/auth/[...nextauth]/options'
import OtherLogin from '@/components/(page)/login/OtherLogin'
import Heading from '@/components/Heading/Heading2'
import LogoSvg from '@/components/Logo/LogoSvg'

export const metadata = {
  title: '모아 - 로그인',
  description: '로그인 페이지',
}

export default async function otherLoginPage() {

  const session = await getServerSession(options)

  if (session !== null) {
    redirect('/')
  }


  return (
  <>
    <main>
      <div className='bg-white pt-10'>
      <div className='flex justify-start m-auto w-[180px] h-auto py-10'>
        <LogoSvg />
      </div>

      <div className='mt-5'>
        <OtherLogin />
      </div>
      </div>
    </main>
  </>
  )
}