'use client'

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Progress } from "@nextui-org/react";
import Sequence1 from "./Sequence1.jsx";
import Sequence2 from "./Sequence2.jsx";
import Sequence3 from "./Sequence3.jsx";
import Sequence4 from "./Sequence4.jsx";
import Sequence5 from "./Sequence5.jsx";
import Sequence6 from "./Sequence6.jsx";
import Sequence7 from "./Sequence7.jsx";
import Sequence8 from "./Sequence8.jsx";
import Sequence9 from "./Sequence9.jsx";
import SequenceLast from "./SequenceLast.jsx";
import CreateMeetingBottomNav from "@/components/(navigation)/(bottom)/CreateMeetingBottomNav";
import LinearProgress from '@mui/material/LinearProgress';
import NcModal from "@/components/NcModal/NcModal";
import { useSession } from "next-auth/react";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';



export default function CreateMeeting() {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const [url, setUrl] = useState(usePathname());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const session = useSession();

  // console.log(session);

  function updateQueryParams(baseURL: string, url: string, params: Record<string, string>): string {
    // Add base URL if the provided URL is a relative path
    const fullURL = url.startsWith('/') ? baseURL + url : url;

    const urlObj = new URL(fullURL);
    for (const [key, value] of Object.entries(params)) {
      urlObj.searchParams.set(key, value);
    }
    return urlObj.pathname + urlObj.search;
  }



  let tabs = [
    {
      id: 1,
      label: "모임 선택",
      progress: 10,
      content: <Sequence1 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 2,
      label: "카테고리 선택",
      progress: 20,
      content: <Sequence2 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 3,
      label: "모임 제목",
      progress: 30,
      content: <Sequence3 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 4,
      label: "모임 소개",
      progress: 40,
      content: <Sequence4 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 5,
      label: "날짜",
      progress: 50,
      content: <Sequence5 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 6,
      label: "장소",
      progress: 60,
      content: <Sequence6 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 7,
      label: "모집 방법",
      progress: 70,
      content: <Sequence7 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 8,
      label: "멤버 조건",
      progress: 80,
      content: <Sequence8 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 9,
      label: "참가비",
      progress: 90,
      content: <Sequence9 url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
    {
      id: 10,
      label: "요약 및 패칭",
      progress: 100,
      content: <SequenceLast url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} active={active} setActive={setActive} />
    },
  ];



  useEffect(() => {


    const getTempSave = async () => {

      try {
        const response = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting-feature/temp-meeting?userUuid=${session.data?.user.userUuid}`, {

        });

        // if (!response.ok) {
        //   throw new Error(`Fetch failed with status: ${response.status}`);
        // }

        const data = await response.json();


        if (data.result.tempUrl !== null) {

          console.log(data);
          setTempUrl(data.result.tempUrl);
          setIsModalOpen(true);
        }
        else {
          console.log(data);
        }

        // 서버 응답이 성공적으로 완료되면 모달 열기


      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    getTempSave();



    setUrl(window.location.href);
    // setIsModalOpen(true);
  }, []);

  return (
    <>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === active)?.progress} />
      <Progress size="sm" aria-label="Loading..." value={tabs.find(tab => tab.id === active)?.progress} className="max-w-md" />
      <div className="flex w-full flex-col">

        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === active)?.content}
          </CardBody>
        </Card>
      </div>
      {/* <CreateMeetingBottomNav active={active} setActive={setActive} /> */}

      {/* <NcModal
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        modalTitle="임시 저장 내용이 있습니다"
        renderContent={() => (
          <>
            <div>임시 저장한 모임을 불러오시겠슴둥?</div>
            <button onClick={() => {
              // 타입 강제 회피
              // @ts-ignore
              // router.push(`/meeting/create${data.params}`)
              router.push(tempUrl)
              setIsModalOpen(false)
            }}>예</button>
            <button onClick={() => { setIsModalOpen(false) }}>아니오</button>
          </>
        )}
      /> */}

        <NcModal
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          modalTitle="임시 저장한 내용이 있습니다."
          renderContent={() => (
            <div className='flex flex-col items-center'>

              <DownloadForOfflineIcon className='text-[70px]' />
              <div>내용을 불러오시겠습니까?</div>

              <div className='flex justify-between mt-4 gap-10'>
              <button className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full'
              onClick={() => {
              // 타입 강제 회피
              // @ts-ignore
              // router.push(`/meeting/create${data.params}`)
              router.push(tempUrl)
              setIsModalOpen(false)
            }}>예</button>
            <button className='bg-[#eef2ff] font-semibold py-2  rounded-full w-[80px] border border-[#4338ca]' 
            onClick={() => { setIsModalOpen(false) }}>아니오</button>
              </div>
            </div>
          )}
        />
    </>
  );
}
