

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleHeader from "@/app/(singles)/SingleHeader";
import SingleContent from "@/app/(singles)/SingleContent";
import { Sidebar } from "@/app/(singles)/Sidebar";
import SingleRelatedPosts from "@/app/(singles)/SingleRelatedPosts";
import MeetingDetailHeader from "@/components/(navigation)/(top)/MeetingDetailHeader";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

import { getServerSession } from 'next-auth'
import { options } from "@/app/api/auth/[...nextauth]/options";

import NcModal from "@/components/NcModal/NcModal";
import { multiply } from "lodash";

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

async function participateMeeting(id: any) {

  const session = await getServerSession(options)

  const res = await fetch(`https://moa-backend.duckdns.org/api/v1/meeting-feature/participant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meetingId: id,
        userUuid: session?.user.userUuid,
        meetingParticipationAnswer: "YES"
      })
    })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const MeetingDetail: React.FC<MeetingDetailProps> = async ({ id }) => {



  const data = await getData(id)

  console.log(data)
  const bgImag = `https://loremflickr.com/1200/600/busan/?random=${data.result.id}`

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <>
        <header className="py-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black w-full"
          style={{ backgroundImage: `url(${bgImag})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: 'black'}}
        >
          {/* SINGLE HEADER */}
          <div className="dark mx-auto max-w-screen-lg relative z-10 px-5 md:px-0">
              <SingleHeader hiddenDesc title={data.result.title} />
          </div>
        </header>
        <div className="container mt-10">
          <SingleContent data={data}/>
        </div>
    </>
  );
};

export default MeetingDetail;
