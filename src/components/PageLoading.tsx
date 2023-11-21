import React from 'react'
import Loading from './Button/Loading'

function PageLoading({title}:{title:string}) {
  return (
    <>
    <div className='w-full h-full fixed left-0 top-0 z-[9999] flex flex-col justify-center items-center'>
        <Loading />
        <p className='text-center text-white text-sm mt-10'>{title}</p>
    </div>
    <div className='w-full h-full fixed left-0 top-0 z-[9000] bg-black opacity-50'></div>
    </>
  )
}

export default PageLoading