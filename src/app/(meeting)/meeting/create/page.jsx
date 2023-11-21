
import HeaderMeetCreate from '@/components/(navigation)/(top)/HeaderMeetCreate'
import CreateMeeting from '@/components/(meeting)/(create)/CreateMeeting'
import MeetingCreateHeader from '@/components/(navigation)/(top)/MeetingCreateHeader'
import React from 'react'



export default function page() {
  return (
    <div>
      <HeaderMeetCreate />
      <MeetingCreateHeader />
      <CreateMeeting />
    </div>
  )
}
