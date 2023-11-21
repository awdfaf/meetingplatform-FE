import React from 'react'
import SnsLogin from '@/components/(page)/login/SnsLogin'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '@/app/api/auth/[...nextauth]/options'

export const metadata = {
  title: '모아 - 로그인',
  description: '로그인 페이지',
}

export default async function LoginPage() {

  const session = await getServerSession(options)

  if (session !== null) {
    redirect('/')
  }


  return (
    <div className='h-full bg-white'>
      <SnsLogin />
    </div>
  )
}
