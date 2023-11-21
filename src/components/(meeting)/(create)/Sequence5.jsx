'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputMeetingDatetime, setInputMeetingDatetime] = useState(searchParams.get('MeetingDatetime') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      MeetingDatetime: inputMeetingDatetime,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      {/* <Heading desc={""}>언제 만날까요?</Heading> */}

      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>언제 만날까요?</p>
        <p className="text-xs text-center text-gray-500">모임이 생성된 후에는 변경할 수 없으니 신중하게 설정해 주세요</p>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>

          
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>모임 일시</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputMeetingDatetime}
            onChange={(e) => setInputMeetingDatetime(e.target.value)}
          />
        </div>
        <button onClick={handleNext}>Next</button>
      </div>

{/*       <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputMeetingDatetime}
          onChange={(e) => setInputMeetingDatetime(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div> */}
    </>
  );
}
