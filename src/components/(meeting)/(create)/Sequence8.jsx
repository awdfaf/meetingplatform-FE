'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputJoinGender, setInputJoinGender] = useState(searchParams.get('JoinGender') || '');
  const [inputMaxAge, setInputMaxAge] = useState(searchParams.get('MaxAge') || '');
  const [inputMinAge, setInputMinAge] = useState(searchParams.get('MinAge') || '');
  const [inputMaxParticipantNum, setInputMaxParticipantNum] = useState(searchParams.get('MaxParticipantNum') || '');
  const [inputCompanyList, setInputCompanyList] = useState(searchParams.get('CompanyList') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      JoinGender: inputJoinGender,
      MaxAge: inputMaxAge,
      MinAge: inputMinAge,
      MaxParticipantNum: inputMaxParticipantNum,
      CompanyList: inputCompanyList,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <Heading desc={""}>어떤 멤버를 모집할까요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputJoinGender}
          onChange={(e) => setInputJoinGender(e.target.value)}
        />
        <input
          type="text"
          value={inputMaxAge}
          onChange={(e) => setInputMaxAge(e.target.value)}
        />
        <input
          type="text"
          value={inputMinAge}
          onChange={(e) => setInputMinAge(e.target.value)}
        />
        <input
          type="text"
          value={inputMaxParticipantNum}
          onChange={(e) => setInputMaxParticipantNum(e.target.value)}
        />
        <input
          type="text"
          value={inputCompanyList}
          onChange={(e) => setInputCompanyList(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
