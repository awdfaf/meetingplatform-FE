import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import CategorySelect from '@/components/(page)/signup/after/CategorySelect'
import React from 'react'

function Interest() {
  return (
    <>
    <main>
      <BackbuttonHeader contents='관심사 선택'/>
      <div className='mt-14'>
      <CategorySelect />
      </div>
    </main>
    </>
  )
}

export default Interest