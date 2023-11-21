/* 'use client'

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Progress } from "@nextui-org/react";
import FormArea from "./FormArea";
import CertPage from "./CertPage";
import Jobverify from "./Jobverify";
import CreateMeetingBottomNav from "@/components/(navigation)/(bottom)/CreateMeetingBottomNav";
import NcModal from "@/components/NcModal/NcModal";




export default function JoinMOA() {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const [url, setUrl] = useState(usePathname());
  const [isModalOpen, setIsModalOpen] = useState(false);

  function updateQueryParams(baseURL: string, url: string, params: Record<string, string>): string {
    // Add base URL if the provided URL is a relative path
    const fullURL = url.startsWith('/') ? baseURL + url : url;

    const urlObj = new URL(fullURL);
    for (const [key, value] of Object.entries(params)) {
      urlObj.searchParams.set(key, value);
    }
    return urlObj.pathname + urlObj.search;
  }

  const handleSubmit = () => {
    // Handle your submit logic here
    console.log('Button Clicked!');
  };


  let tabs = [
    {
      id: 1,
      label: "정보 입력",
      progress: 10,
      content: <CertPage url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 2,
      label: "가입하기",
      progress: 20,
      content: <FormArea url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
    {
      id: 3,
      label: "직장 인증",
      progress: 30,
      content: <Jobverify url={url} setUrl={setUrl} updateQueryParams={updateQueryParams} />
    },
  ];



  useEffect(() => {
    // const getTempSave = async () => {
    //   // if (!token) {
    //   //   console.error("Token is not provided.");
    //   //   return;
    //   // }
    //   try {
    //     const response = await fetch(``, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // 'Authorization': `Bearer ${token}`
    //       }
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Fetch failed with status: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     // 서버 응답이 성공적으로 완료되면 모달 열기
    //     setIsModalOpen(true);

    //   } catch (error) {
    //     console.error('Error fetching barcode:', error);
    //   }
    // };

    // getTempSave();
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Progress size="sm" aria-label="Loading..." value={tabs.find(tab => tab.id === active)?.progress} className="max-w-md" />
      <div className="flex w-full flex-col">

        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === active)?.content}
          </CardBody>
        </Card>
      </div>
      <CreateMeetingBottomNav active={active} setActive={setActive} />

      <NcModal
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        modalTitle="Your Modal Title"
        renderContent={() => (
          <>
            <div>Your modal content here</div>
            <button onClick={() => {
              // 타입 강제 회피
              // @ts-ignore
              // router.push(`/meeting/create${data.params}`)
              router.push(`/meeting/create`)
            }}>Submit</button>
          </>
        )}
      />
    </>
  );
}
 */