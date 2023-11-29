'use client'

import React, { useState, useEffec, useRef } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';


export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputMeetingDatetime, setInputMeetingDatetime] = useState(searchParams.get('MeetingDatetime') || '');
  const { url, setUrl, updateQueryParams, active, setActive } = props;

  const ref = useRef()
  const maxTabs = 10;

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    if (active < maxTabs) {
      setActive(active + 1);
    }
  };

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSave = () => {
    const baseURL = 'https://meetingplatform-fe.vercel.app'; // Adjust as needed

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
      {/* <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels>
            <BottomNavigationAction key="previous" label="이전" icon={<RestoreIcon />} onClick={() => { handleSave(); handlePrevious(); }} />
            <BottomNavigationAction key="empty1" label="" />
            <BottomNavigationAction key="empty2" label="" />
            <BottomNavigationAction key="empty3" label="" />
            <BottomNavigationAction key="next" label="다음" icon={<ArchiveIcon />} onClick={() => { handleSave(); handleNext(); }} />
          </BottomNavigation>
        </Paper>
      </Box> */}
        <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm right-[1px]'>
          <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
          onClick={() => { handleSave(); handlePrevious(); }}>
            이전
          </button>

          <button className="w-full h-[44px] grid place-items-center text-white font-semibold rounded-xl bg-[#4338ca]"
          onClick={() => { handleSave(); handleNext(); }}>
            다음
          </button>
        </div>
    </>
  );
}
