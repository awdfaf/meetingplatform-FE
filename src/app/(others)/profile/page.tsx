// 'use client'

// import CategorySelect from '@/components/(page)/signup/after/CategorySelect';
// import Image from 'next/image'
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react'

// function profileModify(props:any) {

//   const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
//   const router = useRouter();
//   const searchParams = useSearchParams()

//   const [inputDescription, setInputDescription] = useState<string>(searchParams.get('Description') || '');
//   const [inputHeaderImageUrl, setInputHeaderImageUrl] = useState<string>(searchParams.get('HeaderImageUrl') || '');
//   const { url, setUrl, updateQueryParams } = props;

//   // 이미지 url 저장 변수
//   let [src, setSrc] = useState<string>('')

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", "),
//     [selectedKeys]
//   );

//   const handleNext = () => {
//     const baseURL = 'http://localhost:3000'; // Adjust as needed

//     const updatedUrl = updateQueryParams(baseURL, url, {
//       Description: inputDescription,
//       HeaderImageUrl: inputHeaderImageUrl,
//     });
//     setUrl(updatedUrl);
//     router.push(updatedUrl);
//   };




//   return (
//     <>
//     <main>

//       <input type="file" accept="image/*"
//         onChange={async (e) => {
//           // 파일명 얻기
//           let file = e.target.files?.[0];

//           if (file) {
//             // 파일명 인코딩
//             let filename = encodeURIComponent(file.name);

//             // api 요청 - presigned url 얻기
//             let res = await fetch(`/api/awss3/upload?file=${filename}`);

//             // presigned url 받아옴
//             res = await res.json();

//             console.log(res);

//             // S3 업로드
//             // TODO: 파일 업로드하면 바로 s3에 업로드된다.
//             // 나중에 createObjectURL을 이용해 모임 정보 생성할 때 업로드하도록 수정
//             const formData = new FormData();
//             Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
//               formData.append(key, value);
//             });

//             let 업로드결과 = await fetch(res.url, {
//               method: 'POST',
//               body: formData,
//             });

//             console.log(업로드결과);

//             if (업로드결과.ok) {
//               setSrc(업로드결과.url + '/' + filename);
//             } else {
//               console.log('실패');
//             }
//           }
//         }}
//       />
//       {/* 이미지 출력 */}
//       <img src={src} alt="Uploaded" />


//       <div className='name_modify mt-10'>
//         <p className='text-xl font-semibold'>닉네임</p>
//         <input
//         type="text"
//         name="nickname"
//         className='w-full border rounded-lg mt-2'/>
//         <p>닉네임은 14일에 한번씩 바꿀 수 있습니다.</p>
//       </div>

//       <div className='introduce_modify mt-5'>
//       <p className='text-xl font-semibold'>소개글</p>
//       <input
//       type="text"
//       name='introduce'
//       className='w-full h-[100px] border rounded-lg mt-2' />
//       </div>

//       <div className='category_modify mt-5'>
//       <p className='text-xl font-semibold mb-2'>관심사</p>
//       <CategorySelect />
//       </div>
//     </main>
//     </>
//   )
// }

// export default profileModify
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
