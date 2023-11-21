

import CreateMeeting from '@/components/(meeting)/(create)/CreateMeeting'
import MeetingCreateHeader from '@/components/(navigation)/(top)/MeetingCreateHeader'
import React from 'react'



export default function page() {
  return (
    <div>
      <MeetingCreateHeader />
      <CreateMeeting />
    </div>
  )
}
