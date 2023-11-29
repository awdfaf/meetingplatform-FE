import SiteHeader from '@/app/SiteHeader'
import MeetingDetail from '@/components/(meeting)/(detail)/MeetingDetail'
import MeetingDetailHeader from '@/components/(navigation)/(top)/MeetingDetailHeader'
import React from 'react'

export default function page({ params }: { params: { id: string } }) {



  return (
    <>
      <SiteHeader />
      <MeetingDetailHeader />
      <MeetingDetail id={params.id} />
    </>
  )
}
