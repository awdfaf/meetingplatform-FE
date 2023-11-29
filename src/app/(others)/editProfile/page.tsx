'use client'

import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader';
import AWS from 'aws-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ModeIcon from '@mui/icons-material/Mode';

interface ProfileData {
  userUuid?: string,
  nickname?: string,
  userIntroduce?: string,
  profileImageUrl?: string,
  reviewerCount?: number,
  userMannersTemparature?: number,
  sameWithLoggedInUser?: boolean
}

interface ProfileResponse {
  result: ProfileData;
  isSuccess: boolean;
  message: string;
}

function ProfileModify(props:any) {

  const { data: session } = useSession<any>();
// console.log(session)
const [userData, setUserData] = useState<any>({}); // 사용자 데이터를 저장할 상태
const [isLoading, setIsLoading] = useState(false);

const [nickname, setNickname] = useState('');
const [introduce, setIntroduce] = useState('');

const userUuid = session?.user?.userUuid.toString();
const token = session?.user?.token;
// console.log(userUuid)

  const router = useRouter()
  const [loding, setLoding] = useState<boolean>(false);
  const [myFile, setMyFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [form, setForm] = useState({
    userUuid: userUuid || '',
    nickname: '',
    introduce: '',
    profileImageUrl: '',
  });

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
    region: process.env.AWS_REGION as string,
    signatureVersion: 'v4',
})



const handleCertImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  setMyFile(null);
  const files = (e.target as HTMLInputElement).files;
  console.log(files)
  if (files?.length) {
      const file = files[0];
      setMyFile(file);
      setLoding(true);
      // console.log(process.env.BUCKET_NAME, process.env.ACCESS_KEY, process.env.SECRET_KEY, process.env.AWS_REGION)

      try {
          const upload = new AWS.S3.ManagedUpload({
          params: {
              ACL: "public-read",
              Body: file,
              Key: "contents/" + file.name,
              Bucket: process.env.BUCKET_NAME as string,
          },
          });
          const promise = upload.promise();
          console.log("promise", (await promise).Location);
          const myUrl = (await promise).Location;

      // 이미지 URL 상태 업데이트
      setImageUrl(myUrl);

      // form 상태 업데이트
        setForm(prevForm => ({
          ...prevForm,
          profileImageUrl: myUrl,
        }));

          setLoding(false);
      } catch (error) {
      // Handle network or other errors
      console.error('Error uploading image:', error);
      setLoding(false);
      }
  }
}

// 닉네임이나 소개글을 입력할 때마다 form의 nickname과 introduce 상태를 업데이트합니다.
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(form)
  setForm(prevForm => ({
    ...prevForm,
    [e.target.name]: e.target.value,
  }));
};

const handleProfileUpdate = async () => {
  try {
    // PATCH 요청을 보낼 URL
    const apiUrl = 'https://moamoa-backend.duckdns.org/api/v1/user/profile';

    // PATCH 요청 보내기
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      // 성공적으로 업데이트된 경우 페이지 이동 등 추가 로직

      router.push('/author/[id]'); // 프로필 페이지로 이동
    } else {
      console.error('Error updating profile:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};



// const userUuid = session?.user.userUuid || '';

useEffect(() => {
  const getData = async () => {
    try {

      if (!token || !userUuid) {
        return;
      }

      const res = await fetch(`https://moamoa-backend.duckdns.org/api/v1/user/profile/${userUuid}`, {
      headers:  {
      Authorization: `Bearer ${token}`,},
    });
    
      // const data = await res.json();
      if (res.ok) {
        const result: ProfileResponse= await res.json();
        const userData: ProfileData= result.result;
        setUserData(userData);
        // 닉네임과 소개글 상태 업데이트
      setNickname(userData.nickname || '');
      setIntroduce(userData.userIntroduce || '');
      setImageUrl(userData.profileImageUrl || "/images/basicProfile.jpg"); // 기본 이미지 URL 설정
      } else {
        // 응답이 실패하면 에러 상태 업데이트
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // 네트워크 오류 등의 경우 에러 상태 업데이트
      setError('Failed to fetch data');
    } finally {
      // 데이터 로딩이 완료되면 로딩 상태 업데이트
      setIsLoading(false);
    }
  };

  // fetchData 함수 호출
  getData();
}, [token, userUuid]);


  return (
    <>
    <main>

      <BackbuttonHeader contents='프로필 수정'/>
      <div className='name_modify mt-10'>
      <p className='text-xl font-semibold mb-3'>프로필 사진</p>
        {/* <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <input
              type="file"
              name="companyCertImg"
              id='fileInput'
              className='file:text-xs file:bg-[#f7852e] file:border-none file:text-white file:px-6 file:rounded-full file:text-end file:h-10 file:font-semibold file:mr-2 border-2 border-[#E5E7EB] rounded-full w-full text-[0.8rem] pr-6'
              onChange={handleCertImgFile}
          />
          </div> */}
          <div className='flex flex-col relative justify-start md:w-[80%] w-full transition-all'>
            <input
              type="file"
              name="companyCertImg"
              id='fileInput'
              style={{ display: 'none' }} // input 필드 숨기기
              onChange={handleCertImgFile}
            />
            <label htmlFor="fileInput" className="bg-gray-300 rounded-full text-[18px] h-fit w-fit p-0.5 absolute left-[75px] top-16" >
              <ModeIcon className="h-8 w-8"/>
            </label> 
            {imageUrl && 
            <img
            src={imageUrl} 
            alt="프로필 사진" 
            style={{
              borderRadius: '50%', // 원형으로 만들기
              width: '100px', // 가로 크기 조절
              height: '100px' // 세로 크기 조절
            }} 
            />} 
          </div>

      <div className='mt-10'>
        <p className='text-xl font-semibold mb-3'>닉네임</p>
        <input
        type="text"
        name="nickname"
        defaultValue={nickname}
        onChange={handleChange}
        className='w-full border rounded-lg mt-2'/>
        <p className='text-sm font-semibold mt-2'>닉네임은 <span className='text-red-600'>14일</span>에 한번씩 변경할 수 있습니다.</p>
      </div>

      </div>

      <div className='introduce_modify mt-5'>
      <p className='text-xl font-semibold'>소개글</p>
      <input
      type="text"
      name='introduce'
      defaultValue={introduce}
      onChange={handleChange}
      className='w-full h-[100px] border rounded-lg mt-2' />
      </div>

      <div className='flex mt-10'>
      <button className='mx-auto h-[44px] w-[300px] bg-[#4338ca] rounded-2xl text-white font-semibold'
      onClick={handleProfileUpdate}>
        수정하기
        </button> 
      </div>
    </main>
    </>
  )
}

export default ProfileModify
