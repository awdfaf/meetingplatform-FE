'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';
import Checkbox from '@/components/Checkbox/Checkbox';

export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()
  const [inputMeetingAddress, setInputMeetingAddress] = useState(searchParams.get('MeetingAddress') || '');
  const { url, setUrl, updateQueryParams } = props;
  const [IsOnline, setIsOnline] = useState(searchParams.get('IsOnline') || '');
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      MeetingAddress: inputMeetingAddress,
      IsOnline: IsOnline
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <Heading desc={""}>어디서 만날까요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputMeetingAddress}
          onChange={(e) => setInputMeetingAddress(e.target.value)}
        />
        <input
          type="text"
          value={IsOnline}
          onChange={(e) => setIsOnline(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>


    </>
  );
}
