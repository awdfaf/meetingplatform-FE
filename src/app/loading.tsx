import MoaLogo from '@/components/Logo/MoaLogo'
import React from 'react'

function loading() {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-slate-200 dark:bg-slate-900'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-300 dark:border-slate-400'>
        </div>
        <MoaLogo 
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        />
    </div>
  )
}

export default loading