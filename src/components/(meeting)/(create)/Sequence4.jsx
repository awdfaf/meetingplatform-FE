'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';





export default function Sequence4(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputDescription, setInputDescription] = useState(searchParams.get('Description') || '');
  const [inputHeaderImageUrl, setInputHeaderImageUrl] = useState(searchParams.get('HeaderImageUrl') || '');
  const { url, setUrl, updateQueryParams } = props;

  // 이미지 url 저장 변수
  let [src, setSrc] = useState('')

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      Description: inputDescription,
      HeaderImageUrl: inputHeaderImageUrl,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };




  return (
    <>

      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>모임을 소개해 주세요</p>
        <p className="text-xs text-center text-gray-500">소개글이 참신하고 자세할수록 좋은 인연을 만날 수 있겠죠?</p>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>

          
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>모임명</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            type="text"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          />

          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem] mt-5'
            type="text"
            value={inputHeaderImageUrl}
            onChange={(e) => setInputHeaderImageUrl(e.target.value)}
          />
        </div>

        <div className='mt-5 w-full md:w-[80%]'>
      <input type="file" accept="image/*"
        className='file:text-xs file:bg-[#f7852e] file:border-none file:text-white file:px-6 file:rounded-full file:text-end file:h-10 file:font-semibold file:mr-2 border-2 border-[#E5E7EB] rounded-full w-full text-[0.8rem] pr-6'
        onChange={async (e) => {
          // 파일명 얻기
          let file = e.target.files[0]

          // 파일명 인코딩
          let filename = encodeURIComponent(file.name)

          // api 요청 - presigned url 얻기
          let res = await fetch(`/api/awss3/upload?file=${filename}`)

          // presigned url 받아옴
          res = await res.json()

          console.log(res)

          //S3 업로드 
          // TODO: 파일 업로드하면 바로 s3에 업로드된다. 
          // 나중에 createObjectURL을 이용해 모임 정보 생성할 때 업로드하도록 수정
          const formData = new FormData()
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value)
          })
          let result = await fetch(res.url, {
            method: 'POST',
            body: formData,
          })
          console.log(result)

          if (result.ok) {
            setSrc(result.url + '/' + filename)
          } else {
            console.log('실패')
          }
        }}
      />
      {/* 이미지 출력 */}
      <img src={src} />
      </div>
      <button onClick={handleNext}>Next</button>
      </div>



{/*       <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <input
          type="text"
          value={inputHeaderImageUrl}
          onChange={(e) => setInputHeaderImageUrl(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div> */}
    </>
  );
}
