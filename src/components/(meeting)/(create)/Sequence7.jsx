'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence5(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputIsFcfs, setInputIsFcfs] = useState(searchParams.get('IsFcfs') || '');
  const [inputQuestion, setInputQuestion] = useState(searchParams.get('Question') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      IsFcfs: inputIsFcfs,
      Question: inputQuestion,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <Heading desc={""}>어떻게 멤버를 모집할까요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputIsFcfs}
          onChange={(e) => setInputIsFcfs(e.target.value)}
        />
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
