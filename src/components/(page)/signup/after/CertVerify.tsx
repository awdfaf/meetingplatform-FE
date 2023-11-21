/* 'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function CertVerify(props:any) {

  const router = useRouter();
  const [inputDescription, setInputDescription] = useState<string>();
  const [inputHeaderImage, setInputHeaderImage] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!inputHeaderImage) {
      // No image selected, handle this case as needed
      return;
    }

    try {

      const formData = new FormData();
      formData.append('image', inputHeaderImage);

      // Send the image to the server for upload
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.text();
        // Do something with the imageUrl, e.g., save it in your component state
        console.log('Image uploaded:', imageUrl);
      } else {
        // Handle the error when the upload fails
        console.error('Image upload failed.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
    <main>
      <div className='tracking-tighter py-4'>
        <p className='text-lg'>재직증명서를 업로드 해주세요.</p>
        <p className='text-sm'>사내메일이 없다면 재직증명서로 인증할 수 있습니다.
        </p>
      </div>
      <div className='flex justify-between'>
          <input
            type="file"
            id='fileInput'
            className='file:text-sm file:bg-black file:text-white file:p-2 file:rounded-l-xl file:h-10 file:font-semibold border  border-black rounded-full '
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value[0])}
              // onChange={(e) => handleOnChange(e, certData, setCertData)}
          />
{/*       <button className='bg-[#eef2ff] rounded-full p-2 min-w-[80px] font-semibold'>찾아보기</button>       *//* }
      </div>

      <div className='px-3'>
      <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white' onClick={handleImageUpload}>가입완료</button>
      </div>
    </main>
    </>
  )
}

export default CertVerify */

'use client'

import { SignupType } from '@/types/SignupType';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

function CertVerify({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {
  const router = useRouter();
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputHeaderImage, setInputHeaderImage] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!inputHeaderImage) {
      // No image selected, handle this case as needed
      return;
    }

    try {
      const file = inputHeaderImage;
      const fileName = encodeURIComponent(file.name);

      const formData = new FormData();
      formData.append('image', inputHeaderImage);

      // Send the image to the server for upload
      const response = await fetch(`/api/awss3/upload?file=${fileName}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.text();
        setSignUpData((prevData) => ({
          ...prevData,
          certificateImageUrl: imageUrl,
        }));
        // Do something with the imageUrl, e.g., save it in your component state
        console.log('Image uploaded:', imageUrl);
      } else {
        // Handle the error when the upload fails
        console.error('Image upload failed.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error uploading image:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputHeaderImage(file);
      setInputDescription(file.name);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const companyName = e.target.value;
    setSignUpData((prevData) => ({
      ...prevData,
      companyName: companyName,
    }));
  };

  return (
    <>
      <main>
        <div className="tracking-tighter py-4">
          <p className="flex text-lg justify-center font-semibold">재직증명서를 업로드 해주세요.</p>
          <p className='flex justify-center'>제출하기를 눌러야 회원가입을 완료할 수 있습니다.</p>
        </div>

    <div>
    <p>회사명</p> 
      <input type="text" name='companyName'  className='rounded-xl h-10 min-w-[150px] w-[200px]' onChange={handleChange}/>
      <div className='flex justify-between'>
        <div className="flex border-b border-b-black w-full w-min-[250px] h-16 items-end">
          <p className='text-xl'>{inputDescription}</p>
        </div>

        <div className="mt-3">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="my-2 text-gray-900 bg-[#eef2ff] p-3 rounded-full font-semibold min-w-[100px]"
            onClick={() => {
              const fileInput = document.getElementById('fileInput') as HTMLInputElement;
              fileInput.click();
            }}
          >
            찾아보기
          </button>
        </div>

        </div>
        <div className='flex justify-end mt-3'>
        <button className="bg-[#4338ca] min-w-[128px] text-white w-32 h-10 rounded-3xl font-semibold" onSubmit={handleImageUpload}>제출하기</button>
        </div>
        </div>



      </main>
    </>
  );
}

export default CertVerify;
