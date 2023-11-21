

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SingleContent from "@/app/(singles)/SingleContent";
import { Sidebar } from "@/app/(singles)/Sidebar";
import SingleRelatedPosts from "@/app/(singles)/SingleRelatedPosts";
import MeetingDetailHeader from "@/components/(navigation)/(top)/MeetingDetailHeader";

interface MeetingDetailProps {
  id: any;
}

async function getData(id: any) {
  const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting/${id}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return res.json()
}
const MeetingDetail: React.FC<MeetingDetailProps> = async ({ id }) => {

  const data = await getData(id)

  console.log(data.result.title)

  // const [meetingData, setmeetingData] = useState({
  //   title: '',
  //   hostUuid: '',
  //   hostNickname: '',
  //   placeAddress: '',
  //   description: '',
  //   entryFee: '',
  //   meetingDatetime: '',
  //   firstComeFirstServed: '',
  //   onlineStatus: '',
  //   maxParticipants: '',
  //   currentParticipants: '',
  //   entryFeeInformations: '',
  //   entryFeeInfomationEtcString: '',
  //   entryFeeInfoEtcString: '',
  //   participationQuestion: '',
  //   headerImageUrl: '',
  //   meetingStatus: '',
  //   joinGender: '',
  // });

  // useEffect(() => {


  //   const getMeetingDetail = async () => {
  //     try {
  //       const response = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting/?${id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Fetch failed with status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       if (data.success === true) {
  //         setmeetingData(prevData => ({
  //           ...prevData,
  //           title: data.data.title,
  //           meetingAddress: data.data.meetingAddress,
  //           description: data.data.description,
  //           entryFee: data.data.entryFee,
  //           meetingDatetime: data.data.meetingDatetime,
  //           refundPolicy: data.data.refundPolicy,
  //           isFcfs: data.data.isFcfs,
  //           isOnline: data.data.isOnline,
  //           maxParticipantNum: data.data.maxParticipantNum,
  //           maxAge: data.data.maxAge,
  //           minAge: data.data.minAge,
  //           companyList: data.data.companyList,
  //           entryFeeInfoIdList: data.data.entryFeeInfoIdList,
  //           entryFeeInfoEtcString: data.data.entryFeeInfoEtcString,
  //           themeCategoryId: data.data.themeCategoryId,
  //           question: data.data.question,
  //           headerImageUrl: data.data.headerImageUrl,
  //           joinGender: data.data.joinGender,
  //         }));
  //       }
  //       else {

  //       }

  //     } catch (error) {
  //       console.error('Error fetching barcode:', error);
  //     }
  //   };

  //   getMeetingDetail();



  // }, [])


  return (
    <>
      <MeetingDetailHeader />
      <div className={`relative`}>
        <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
          {/* SINGLE HEADER */}
          <div className="dark container relative z-10">
            <div className="max-w-screen-md">
              <SingleHeader hiddenDesc title={data.result.title} />
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
            <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
            {/* <Image
              className="block w-full h-full object-cover"
              src={"https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png"}
              alt=""
              width={1635}
              height={774}
              sizes="(max-width: 1024px) 100vw, 1240px"
            /> */}
          </div>
        </header>
        <div className="container flex flex-col my-10 lg:flex-row ">
          <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
            {/* <SingleContent /> */}
            <div dangerouslySetInnerHTML={{ __html: data.result.description }} />
          </div>
          <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
            <Sidebar />
          </div>
        </div>

        {/* RELATED POSTS */}
        {/* <SingleRelatedPosts /> */}
      </div>
    </>
  );
};

export default MeetingDetail;
