'use client'

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { grey } from '@mui/material/colors';
import NcModal from "@/components/NcModal/NcModal";
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'

export default function MeetingCreateHeader() {

  const router = useRouter();
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TempSave = async () => {
    // if (!token) {
    //   console.error("Token is not provided.");
    //   return;
    // }
    try {
      const response = await fetch(`https://moamoa-backend.duckdns.org/api/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tempurl: `/meeting/create/?${searchParams?.toString()}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isSuccess === true) {
        // router.push('/');
        console.log(data);
      }
      else {

      }

    } catch (error) {
      console.error('Error fetching barcode:', error);
    }
  };





  return (
    <>
      <NcModal
        isOpenProp={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        modalTitle="임시 저장 하시겠습니까?"
        renderContent={() => (
          <>
            <div>Your modal content here</div>
            <button onClick={() => {

              console.log(searchParams?.toString())
              TempSave()
              router.push(`/`)
            }}>예</button>
            <button onClick={() => { router.push('/') }}>아니오</button>
          </>
        )}
      />
      <Navbar className="bg-white">
        <NavbarBrand>
          <button onClick={() => { setIsModalOpen(true) }}>
            <div className="mt-5 mb-5">
              <ArrowBackIcon fontSize="large" sx={{ color: grey[900] }} />
            </div>
          </button>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">

        </NavbarContent>
      </Navbar>
    </>
  );
}
