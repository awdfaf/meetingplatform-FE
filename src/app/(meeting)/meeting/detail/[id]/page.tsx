import MeetingDetail from '@/components/(meeting)/(detail)/MeetingDetail'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {



  return (
    <div>
      <MeetingDetail id={params.id} />
    </div>
  )
}
