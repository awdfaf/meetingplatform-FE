'use client'
import PageLoading from '@/components/PageLoading';
import { SignupType } from '@/types/SignupType';
import React, { useEffect, useState } from 'react'
import AWS from 'aws-sdk'
import { set } from 'lodash';

interface CertProps {
    signUpData: SignupType;
    setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
    active: any;
    setActive: React.Dispatch<React.SetStateAction<any>>;
    stepId: number;
}

function CompanyCertVerify({ signUpData, setSignUpData, active, setActive, stepId }: CertProps) {

    const [loding, setLoding] = useState<boolean>(false);
    const [myFile, setMyFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY as string,
        secretAccessKey: process.env.SECRET_KEY as string,
        region: process.env.AWS_REGION as string,
        signatureVersion: 'v4',
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === 'companyName' && value === ''){
            setError('이름을 입력해주세요.');
        } else {
            setError('');
        }
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    }

    const handleCertImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setMyFile(null);
        const files = (e.target as HTMLInputElement).files;
        console.log(files)
        if (files?.length) {
            const file = files[0];
            setMyFile(file);
            setLoding(true);
            console.log( process.env.AWS_REGION)
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
                setSignUpData((prevData) => ({
                    ...prevData,
                    certificateImageUrl: myUrl,
                }));
                setLoding(false);
               
            } catch (error) {
            // Handle network or other errors
            console.error('Error uploading image:', error);
            setLoding(false);
            }
        }
    }

    useEffect(()=>{
        if(signUpData.companyName !== '' && signUpData.certificateImageUrl !== ''){
            setActive({
                ...active,
                [stepId - 1]: {
                    id: stepId,
                    status: true,
                },
            })
        } else {
            setActive({
                ...active,
                [stepId - 1]: {
                    id: stepId,
                    status: false,
                },
            })
        }
    },[signUpData])

  return (
    <>
    { loding && <PageLoading title='이미지를 업로드 중입니다.' />}
    <main className='container mt-10 mb-5'>
        <div className='tracking-tighter mb-8'>
            <p className='text-lg font-semibold text-center'>재직증명서를 업로드 해주세요.</p>
            <p className="text-xs text-center text-gray-500">회사명과 재직증명서에 회사명은 동일해야 합니다.</p>
        </div>
        <div className='flex flex-col justify-center items-center relative w-full md:w-[80%] m-auto gap-5'>
            <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
                <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>회사명</label>
                <input
                className='border-2 border-[#E5E7EB] text-[0.7rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
                type="text"
                name="companyName"
                onChange={handleOnChange}
                defaultValue={signUpData.companyName}
                placeholder='회사명을 입력해주세요.'
                />
                {error !== '' && (
                <p className="text-red-500 text-xs mt-1 mb-3 ml-5 text-left">{error}</p>
                )}
            </div>
            <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
                <input
                    type="file"
                    name="companyCertImg"
                    id='fileInput'
                    className='file:text-xs file:bg-[#f7852e] file:border-none file:text-white file:px-6 file:rounded-full file:text-end file:h-10 file:font-semibold file:mr-2 border-2 border-[#E5E7EB] rounded-full w-full text-[0.8rem] pr-6'
                    onChange={handleCertImgFile}
                />
            </div>   
        </div>
    </main>
    </>
  )
}

export default CompanyCertVerify