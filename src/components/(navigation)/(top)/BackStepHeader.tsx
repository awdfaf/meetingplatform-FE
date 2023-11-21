'use client'

import React, { SetStateAction } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation'

export default function BackStepHeader({active, setActive} : {active:number, setActive:React.Dispatch<SetStateAction<number>>}) {

  const router = useRouter();

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    } else {router.back();}
  };

  return (
    <>
      <Navbar className="bg-white">
        <NavbarBrand>
          <button onClick={handlePrevious} >
            <div className="flex gap-24 text-lg font-semibold">
              <ArrowBackIcon fontSize="large" sx={{ color: grey[900] }}/>
              <p>회원가입</p>
            </div>
          </button>
          <div className="mx-auto text-2xl font-semibold"></div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        </NavbarContent>
      </Navbar>
    </>
  );
}