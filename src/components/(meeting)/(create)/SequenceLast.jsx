'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';
import NcModal from '@/components/NcModal/NcModal';
import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

import GroupsIcon from '@mui/icons-material/Groups';


export default function SequenceLast(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const session = useSession();

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSubmit = () => {
    // Handle your submit logic here
    console.log('Button Clicked!');
  };

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


  const [createData, setCreateData] = useState({
    title: searchParams.get('Title'),
    meetingAddress: searchParams.get('MeetingAddress'),
    description: searchParams.get('Description'),
    entryFee: searchParams.get('EntryFee'),
    meetingDatetime: searchParams.get('MeetingDatetime'),
    refundPolicy: searchParams.get('RefundPolicy'),
    isFcfs: searchParams.get('IsFcfs'),
    isOnline: searchParams.get('IsOnline'),
    maxParticipantNum: searchParams.get('MaxParticipantNum'),
    maxAge: searchParams.get('MaxAge'),
    minAge: searchParams.get('MinAge'),
    companyList: searchParams.get('CompanyList'),
    entryFeeInfoIdList: searchParams.get('EntryFeeInfoIdList'),
    entryFeeInfoEtcString: searchParams.get('EntryFeeInfoEtcString'),
    themeCategoryId: searchParams.get('ThemeCategoryId'),
    question: searchParams.get('Question'),
    headerImageUrl: searchParams.get('HeaderImageUrl'),
    joinGender: searchParams.get('JoinGender'),
  });


  const createMeeting = async () => {

    // 1. URL의 파라미터를 가져옵니다.
    let newCreateData = {};
    for (let [key, value] of searchParams.entries()) {
      newCreateData[key] = value;
    }

    // 2. createData의 상태를 업데이트합니다.
    setCreateData(newCreateData);

    // 데이터 변환
    const toBoolean = (value) => value === '1';
    const toInt = (value) => parseInt(value, 10);
    const toJsonArray = (value) => JSON.parse(value);
    const toString = (value) => String(value);


    try {
      const res = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(
          {
            title: toString(createData.title),
            hostUserUuid: toString(session.data.user.userUuid),
            hostNickname: toString(session.data.user.nickname),
            placeAddress: toString(createData.meetingAddress),
            description: toString(createData.description),
            entryFee: toInt(createData.entryFee),
            meetingDatetime: toString(createData.meetingDatetime),
            firstComeFirstServed: toBoolean(createData.isFcfs),
            onlineStatus: toBoolean(createData.isOnline),
            maxParticipants: toInt(createData.maxParticipantNum),
            maxAge: toInt(createData.maxAge),
            minAge: toInt(createData.minAge),
            // participateCompanies: toJsonArray(createData.companyList),
            participateCompanies: ["MAJOR_COMPANY", "MEDIUM_COMPANY"],
            // entryFeeInformations: toJsonArray(createData.entryFeeInfoIdList),
            entryFeeInformations: ["CONTENTS", "NO_SHOW"],
            entryFeeInfomationEtcString: toString(createData.entryFeeInfoEtcString),
            participationQuestion: toString(createData.question),
            headerImageUrl: toString(createData.headerImageUrl),
            participateGender: toString(createData.joinGender),
            themeCategoryId: toInt(createData.themeCategoryId),
          }
        ),
      });
      const data = await res.json();

      if (data.isSuccess === true) {
        router.push('/');
        console.log(data);
      }
      else {

      }
    }
    catch (e) {
      console.error("Error sending request:", e);
    }

  }

  return (
    <>
      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>모임을 만드시겠습니까?</p>
        <p className="text-xs text-center text-gray-500">모임이 생성된 후에는 설정을 변경하실 수 없으니 신중하게 생성해주세요</p>
      </div>
      <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-2xl font-semibold">
        <p className="text-small text-default-500">호스트: {session.data.user.nickname}</p>
        <p className="text-small text-default-500">모임 제목: {createData.title}</p>
        <p className="text-small text-default-500">모임 내용: {createData.description}</p>
        <p className="text-small text-default-500">인원수: {createData.maxParticipantNum}</p>
        <p className="text-small text-default-500">참가 방법: {createData.isFcfs}</p>
        <p className="text-small text-default-500">참가비: {createData.entryFee}</p>
        <p className="text-small text-default-500">참가비 세부사항: {createData.entryFeeInfoIdList} {createData.entryFeeInfoEtcString}</p>
        <p className="text-small text-default-500">성별: {createData.joinGender}</p>
        <p className="text-small text-default-500">날짜: {createData.meetingDatetime}</p>
        <p className="text-small text-default-500">장소: {createData.meetingAddress}</p>

        {/* <button
          className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full'
          onClick={createMeeting}>
          fetch
        </button> */}



      </div>

      {/* <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation showLabels>
            <BottomNavigationAction key="previous" label="이전" icon={<RestoreIcon />} onClick={() => { handlePrevious(); }} />
            <BottomNavigationAction key="empty1" label="" />
            <BottomNavigationAction key="empty2" label="" />
            <BottomNavigationAction key="empty3" label="" />
            <BottomNavigationAction key="empty4" label="" />
          </BottomNavigation>
        </Paper>
      </Box> */}

        <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm right-[1px]'>
          <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
          onClick={() => { handlePrevious(); }}>
            이전
          </button>

          <NcModal
          renderTrigger={(openModal) => 
          <button onClick={openModal}
          className="w-[284px] h-[44px] grid place-items-center text-white font-semibold rounded-xl bg-[#4338ca]">
            모임 생성 완료
          </button>}
          modalTitle="설정을 완료하시겠습니까?"
          className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full'
          renderContent={() => 
          <div  className='flex flex-col items-center'>
          <GroupsIcon className='text-[90px]' />
            <button className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full' onClick={createMeeting}>모임 생성</button>
          </div>}
        />
        </div>
    </>
  );
}
