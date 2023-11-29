'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation'

export default function BackbuttonHeader(props:{contents:string}) {
  const {contents}=props 
  const router = useRouter();

  return (
    <>
      <Navbar className="bg-white">
        <NavbarBrand>
          <button onClick={() => { router.back() }}>
            <div className="-ml-[5px]">
              <ArrowBackIcon fontSize="large" sx={{ color: grey[900] }}/>
            </div>
          </button>
          <div className="mx-auto text-2xl font-semibold">
              {contents}
            </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        </NavbarContent>
      </Navbar>
    </>
  );
}
