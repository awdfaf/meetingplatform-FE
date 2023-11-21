'use client'

import React from 'react'
import HeaderDefault from './HeaderDefault'
import { useSession } from 'next-auth/react'
import HeaderLogin from './HeaderLogin'



export default function Header() {

  const session = useSession()

  return (
    <>
      {
        session.status === 'authenticated' ?
          <HeaderLogin />
          :
          <HeaderDefault />
        // <HeaderLogin />

      }
    </>
  )
}
