'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

function Logout() {
  return (
    <div className='text-red-500'>
      <button onClick={() => signOut()}>
        Log Out
      </button>
    </div>
  )
}

export default Logout