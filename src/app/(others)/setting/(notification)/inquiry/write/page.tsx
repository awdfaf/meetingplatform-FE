import React from 'react'
import NoticeModal from '@/components/(page)/profile/noticeModal'
import Heading2 from '@/components/Heading/Heading2'

function inquiry() {
  return (
    <>
    <main className='mt-[50px]'>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
      <span className="block text-xl mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          문의하실 내용을 작성해 주세요.
        </span>
      </header>
      <div>
        <p>이름</p>
        <input type="text" className='border rounded-xl'/>
      </div>
      <div>
        <p>연락처</p>
        <input type="text" className='border rounded-xl'/>
      </div>
      <div className='pt-[10px]'>
        <select title='inquiry_kind'>
          <option value="01">유저</option>
          <option value="02">모임</option>
          <option value="03">결제/환불</option>
          <option value="04">약관</option>

        </select>
      </div>
      <div>
        <p>제목</p>
        <input type="text" className='border rounded-xl'/>
      </div>

      <div>
        <p>내용</p>
        <input type="text" placeholder='내용을 입력해주세요.(최대 300자)'
        className='border w-full h-[150px] rounded-xl'/>
      </div>

      <div className='flex justify-end'>
      <NoticeModal />
      </div>
    </main>
    </>
  )
}

export default inquiry