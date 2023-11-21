'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputJoinGender, setInputJoinGender] = useState(searchParams.get('JoinGender') || '');
  const [inputMaxAge, setInputMaxAge] = useState(searchParams.get('MaxAge') || '');
  const [inputMinAge, setInputMinAge] = useState(searchParams.get('MinAge') || '');
  const [inputMaxParticipantNum, setInputMaxParticipantNum] = useState(searchParams.get('MaxParticipantNum') || '');
  const [inputCompanyList, setInputCompanyList] = useState(searchParams.get('CompanyList') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      JoinGender: inputJoinGender,
      MaxAge: inputMaxAge,
      MinAge: inputMinAge,
      MaxParticipantNum: inputMaxParticipantNum,
      CompanyList: inputCompanyList,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>

      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>어떤 멤버를 모집할까요?</p>
        <p className="text-xs text-center text-gray-500">모임 멤버의 범위를 설정해주세요</p>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>성별</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputJoinGender}
            onChange={(e) => setInputJoinGender(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>최대 나이</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputMaxAge}
            onChange={(e) => setInputMaxAge(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>최소 나이</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputMinAge}
            onChange={(e) => setInputMinAge(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>최대 인원수</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputMaxParticipantNum}
            onChange={(e) => setInputMaxParticipantNum(e.target.value)}
          />
        </div>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>회사 제한</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputCompanyList}
            onChange={(e) => setInputCompanyList(e.target.value)}
          />
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
{/*       <Heading desc={""}>어떤 멤버를 모집할까요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputJoinGender}
          onChange={(e) => setInputJoinGender(e.target.value)}
        />
        <input
          type="text"
          value={inputMaxAge}
          onChange={(e) => setInputMaxAge(e.target.value)}
        />
        <input
          type="text"
          value={inputMinAge}
          onChange={(e) => setInputMinAge(e.target.value)}
        />
        <input
          type="text"
          value={inputMaxParticipantNum}
          onChange={(e) => setInputMaxParticipantNum(e.target.value)}
        />
        <input
          type="text"
          value={inputCompanyList}
          onChange={(e) => setInputCompanyList(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div> */}
    </>
  );
}
