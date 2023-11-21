'use client'

import Link from "next/link"
import React from "react";

export default function AnnounceList (props: any) {
  return(
    <>
    {props.announces.map((announce : any)=>{
      return <li key={announce.id} className="list-none items-center border-t h-auto min-h-[48px] tracking-tighter">
        <div className="w-full">
        <Link href={`/setting/announce/${announce.id}`}>{announce.title}</Link>
        <p className="text-sm text-slate-500">{announce.date}</p>
        </div>
      </li>
    })}
  </>
  )
}



/* export default function AnnounceList (props: any) {

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return(
    <>
    <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={0.5}
    >
    {props.announces.map((announce : any)=>{
      return <Stack key={announce.id} className="flex justify-between items-center border-t h-auto min-h-[64px] tracking-tighter">
        <div className="w-[180px]">
        <Link href={`/setting/announce/${announce.id}`}>{announce.title}</Link>
        </div>
        <span>{announce.date}</span>
      </Stack>
    })}
    </Stack>
  </>
  )
} */