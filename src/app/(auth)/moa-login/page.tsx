import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '@/app/api/auth/[...nextauth]/options'
import OtherLogin from '@/components/(page)/login/OtherLogin'
import Heading from '@/components/Heading/Heading2'

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
      <div className='bg-white'>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading>Login</Heading>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to moA-Meeting applications
        </span>
      </header>
        <OtherLogin />
      </div>
    </main>
  </>
  )
}