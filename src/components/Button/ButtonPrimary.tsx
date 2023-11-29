"use client";

import React, { FC, useState } from "react";
import Button, { ButtonProps } from "./Button";
import { useSession } from "next-auth/react";
import NcModal from "@/components/NcModal/NcModal";
import { useRouter } from "next/navigation";
import GroupsIcon from '@mui/icons-material/Groups';


export interface Props extends ButtonProps {
  id?: string;
}

const ButtonPrimary: FC<Props> = ({ id, ...props }) => {
  const router = useRouter();
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const participantMeeting = async (meetingId: string) => {

    console.log(session.data?.user.userUuid)

    
      const res = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting-feature/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meetingId: meetingId,
          participantUuid: session.data?.user.userUuid,
          meetingParticipationAnswer: "YES"
        })
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      // 추가 처리
    else {
      console.error("User is not authenticated");
    }
  };

  return (
    <>
      <Button {...props} pattern="primary" onClick={() => {
        setIsModalOpen(true);
        console.log(id);
        console.log(session.data?.user.userUuid)
      }} />

      <NcModal
          isOpenProp={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          modalTitle="모임에 참가하시겠습니까?"
          renderContent={() => (
            <div className='flex flex-col items-center'>

              <GroupsIcon className='text-[70px]' />

            <div className='flex justify-between mt-4 gap-10'>
              <button className='bg-[#4338ca] text-white font-semibold py-2 px-8 rounded-full'
                onClick={() => {
                  if (id) {
                    participantMeeting(id);
                  }
                  setIsModalOpen(false);
                  router.push(`/`);
                }}>예</button>
                <button className='bg-[#eef2ff] font-semibold py-2  rounded-full w-[80px] border border-[#4338ca]'
                  onClick={() => setIsModalOpen(false)}>아니오</button>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default ButtonPrimary;