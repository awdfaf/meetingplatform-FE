'use client'

import React, { useState } from 'react'
import CertTimer from '../../login/CertTimer';
import ButtonCircle from "@/components/Button/ButtonCircle";
import Input from "@/components/Input/Input";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { SignupType } from '@/types/SignupType';
import Swal from 'sweetalert2';
import CertVerify from '../after/CertVerify';
import { useRouter } from 'next/navigation';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

interface PhoneInputProps {
  // 다른 프로퍼티 정의
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

function Jobverify({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {

  const router = useRouter()
  const [verify, setVerify] = useState<any>(false)
  const [remainingTime, setRemainingTime] = useState<any>(300);
  const [codeInput, setCodeinput] = useState<string>('');

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

  const handleResend = () => {
    if (verify) { // 인증번호 재전송을 누를 때 verify를 false로 설정
    setRemainingTime(180);
    } // 인증번호 재전송을 누를 때 remainingTime을 180으로 초기화
  };

    const emailsend = async () => {
      console.log(signUpData.companyEmail)
      try {
          const response = await fetch(`https://moa-backend.duckdns.org/api/v1/user/verify/email-send`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({companyEmail:signUpData.companyEmail}),
          });
          const data = await response.json();
          console.log(data);
          console.log(stepId)

          if(data.isSuccess){
            setSignUpData((prevData) => ({
              ...prevData,
              companyId:data.companyId,
            }));
            
            Swal.fire({
              text: `인증번호를 전송하였습니다.`,
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              customClass: {
                container: "my-swal",
              },
            });
          }
    } catch (error) {
      console.error("Error sending POST request:", error);
  }
};

  const emailconfirm = async (e:any) => {
    e.preventDefault();
    console.log(signUpData.companyEmail)
    try {
        const response = await fetch('https://moa-backend.duckdns.org/api/v1/user/verify/email-confirm',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        companyEmail:signUpData.companyEmail,
        code: codeInput,
      }),
    });
    
        const data = await response.json();
        console.log(data);
        console.log(stepId);
        setActive(
          {
            ...active,
            [stepId-1]: {
              id: stepId,
              status: data.isSuccess,
            },
          }
        )
        if(data.isSuccess){
          Swal.fire({
            text: `인증이 완료되었습니다.`,
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: {
              container: "my-swal",
            },
          });
      } else {
        Swal.fire({
          text: `인증번호가 일치하지 않습니다.`,
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            container: "my-swal",
          },
        });
      }
    } catch (error) {
        console.error("Error sending POST request:", error);
    }
}

    const nextcertVerify = async () => (
      router.push(`/signup?step=5`)
    )


  return (
    <>
    <main className='grid place-items-center'>
    <div className='tracking-tighter py-4'>
      <p className='text-lg font-semibold'>사내메일 주소를 정확하게 입력해주세요.</p>
      <p className="text-sm">사내메일이 없다면 재직증명서로 인증할 수 있습니다.</p>
    </div>

    <div>
    <p>회사이메일</p> 
    <div className='flex gap-2'>
    <input type="text" name='companyEmail' className='rounded-xl h-10 min-w-[150px] w-[200px]' onChange={handleOnChange}/>
    <button
          className={
            verify
              ? "bg-[#eef2ff] min-w-[128px] w-32 h-10 rounded-3xl font-semibold"
              : "bg-[#4338ca] min-w-[128px] text-white w-32 h-10 rounded-3xl font-semibold"
          }
          onClick={() => {
            setVerify(true);
              handleResend();
              emailsend();
          }}
          style={{ alignSelf: "flex-end"}}
        >
        {verify ? "인증번호 재전송" : "인증번호 보내기"}
        </button>
    </div>

    {
      verify &&
        <div>
          <div className='grid place-items-center mt-3'>
            <CertTimer verify={verify} remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>
          </div>

        <form className="mt-5 mx-3 relative max-w-sm">
          <Input
            placeholder="인증번호 입력"
            value={codeInput}
            onChange={(e) => setCodeinput(e.target.value)}
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
            onSubmit={emailconfirm}
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
        </div>
    }
    </div>

    <button className='w-[340px] mt-32 h-10 rounded-xl border-2 border-[#4338ca]' onClick={nextcertVerify}>회사 이메일이 없습니다.</button>
    </main>
    </>
  )
}

export default Jobverify

{/*     <div>
    <button className='w-full mt-40 h-10 rounded-xl bg-[#4338ca] text-white'>가입완료</button>
    <Link href='/jobverify/certverify'>
    <button className='w-full mt-3 h-10 rounded-xl border-2 border-[#4338ca]'>회사 이메일이 없습니다.</button>
    </Link>
    </div> */}