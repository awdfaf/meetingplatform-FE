'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ActiListData, ArtListData, FoodListData, FriendListData, HobbyListData, InvestListData, LanguageListData, PartyListData, TripListData } from '@/data/interest/interestListData'
import { InterestListType } from '@/types/InterestListType'
import Link from 'next/link'

function CategorySelect() {

  return (
    <>
      <main>

        <div className='interest_food flex gap-2'>
          <strong className='text-xl'>푸드</strong>
          <span>
            <Image src="/images/interest/foodIcons.png" alt="moa Logo" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            FoodListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  /*        checked={isChecked}
                          onChange={handleCheckboxChange}
                            style={{
                            overflow: 'hidden',
                            position: 'absolute',
                            left: '-10000px',
                            width: '1px',
                            height: '1px',
                          }} */
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 문화·예술 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>문화·예술</strong>
          <span>
            <Image src="/images/interest/artIcons.png" alt="예술 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            ArtListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 액티비티 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>액티비티</strong>
          <span>
            <Image src="/images/interest/activityIcons.png" alt="액티비티 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            ActiListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 취미 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>취미</strong>
          <span>
            <Image src="/images/interest/hobbyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            HobbyListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 파티 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>파티·소개팅</strong>
          <span>
            <Image src="/images/interest/partyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            PartyListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 여행 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>여행·동행</strong>
          <span>
            <Image src="/images/interest/tripIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            TripListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 자기계발 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>자기계발</strong>
          <span>
            <Image src="/images/interest/studyIcons.png" alt="취미 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            TripListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 친목 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>동네·친목</strong>
          <span>
            <Image src="/images/interest/friendIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            FriendListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 재태크 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>재태크</strong>
          <span>
            <Image src="/images/interest/investIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            InvestListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        {/* 언어 */}
        <div className='interest_food flex gap-2 mt-3'>
          <strong className='text-xl'>언어</strong>
          <span>
            <Image src="/images/interest/languageIcons.png" alt="친목 아이콘" width={30} height={30} />
          </span>
        </div>
        <div className='flex flex-wrap'>
          {
            LanguageListData.map((e: InterestListType) => (
              <>
                <label className='my-1'>
                  <input type='checkbox'
                    key={e.key}
                    className='hidden peer'
                  />
                  <span className='border px-2 py-1 rounded-full mr-1 text-[0.7rem] peer-checked:bg-[#eef2ff]'>{e.contents}</span>
                </label>
              </>
            ))}
        </div>

        <div className='grid place-items-center mt-14'>
          <a href='/join/jobverify'>
            <button className='h-[44px] w-[300px] bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'>
              다음
            </button>
          </a>
        </div>

      </main>
    </>
  )
}

export default CategorySelect