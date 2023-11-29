import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader'
import CategorySelect from '@/components/(page)/signup/after/CategorySelect'
import React from 'react'

function editInterest() {
  return (
    <>
    <main>
    <div>
      <BackbuttonHeader contents='관심사 수정하기'/>
    </div>
    <div className='mt-10'>
    <CategorySelect />
    </div>
    </main>
    </>
  )
}

export default editInterest