'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';


export default function Sequence9(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputEntryFee, setInputEntryFee] = useState(searchParams.get('EntryFee') || '');
  const [inputEntryFeeInfoIdList, setInputEntryFeeInfoIdList] = useState(searchParams.get('EntryFeeInfoIdList') || '');
  const [inputEntryFeeInfoEtcString, setInputEntryFeeInfoEtcString] = useState(searchParams.get('EntryFeeInfoEtcString') || '');
  const [inputRefundPolicy, setInputRefundPolicy] = useState(searchParams.get('RefundPolicy') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      EntryFee: inputEntryFee,
      EntryFeeInfoIdList: inputEntryFeeInfoIdList,
      EntryFeeInfoEtcString: inputEntryFeeInfoEtcString,
      RefundPolicy: inputRefundPolicy,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <Heading desc={""}>참가비가 있나요?</Heading>
      <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputEntryFee}
          onChange={(e) => setInputEntryFee(e.target.value)}
        />
        <input
          type="text"
          value={inputEntryFeeInfoIdList}
          onChange={(e) => setInputEntryFeeInfoIdList(e.target.value)}
        />
        <input
          type="text"
          value={inputEntryFeeInfoEtcString}
          onChange={(e) => setInputEntryFeeInfoEtcString(e.target.value)}
        />
        <input
          type="text"
          value={inputRefundPolicy}
          onChange={(e) => setInputRefundPolicy(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
}
