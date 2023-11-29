'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation'

export default function MeetingDetailHeader() {

  const router = useRouter();

  return (
    <div className="w-fit sticky top-[65px] md:top-[45px] left-[50%] -translate-x-1/2 z-[999]">
        <div className="mt-5 mb-5 bg-black rounded-full p-3 md:p-5 dark:bg-slate-300 animate-pulse cursor-pointer" onClick={() => { router.back() }}>
          <ArrowBackIcon fontSize="medium" sx={{ color: 'white'}} />
        </div>
    </div>
  );
}
