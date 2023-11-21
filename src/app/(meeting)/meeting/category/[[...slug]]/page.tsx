import React from 'react'
import Category from '@/components/(meeting)/(category)/Category'

export default function page({ params }: { params: { slug: any } }) {

  // console.log(params.slug[1]);

  return (
    <div>
      <Category id={params.slug[1]} />
    </div>
  )
}
