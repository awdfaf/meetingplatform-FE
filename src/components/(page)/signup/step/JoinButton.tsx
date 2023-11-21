import { SignupType } from '@/types/SignupType'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2';


function JoinButton({active, stepId, callbackId, signUpData}: {active:any, stepId:number, callbackId?:number, signUpData: SignupType}) {

  const router = useRouter();

  // console.log(active)
  const nextStep = () => {
    console.log(stepId, active[stepId-1]?.status)
    if((stepId === 4 || stepId === 5) && active[stepId-1]?.status){
      signUpRequest();
    }else if(active[stepId-1]?.status){
      router.push(`/signup?step=${stepId+1}`)
    }else{
      Swal.fire({
        text: `입력내용을 확인해주세요.`,
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
  }

  const checkPrev = () => {
    callbackId ? router.push(`/signup?step=${callbackId}`) : router.push(`/signup?step=${stepId-1}`) 
  }

  const signUpRequest = async () => {

    const payLoad = {
      loginId : signUpData.loginId, 
      password : signUpData.password,
      name : signUpData.name,
      birthdate : signUpData.birthdate,
      gender : signUpData.gender,
      phoneNumber : signUpData.phoneNumber,
      nickname : signUpData.nickname,
      agreeAdvertiseRequest : {
        emailNotificationStatus: signUpData.emailNotificationStatus,
        smsNotificationStatus: signUpData.smsNotificationStatus,
        pushNotificationStatus: signUpData.pushNotificationStatus,
      },
      verifyCompanyEmailRequest: {
        companyId: signUpData.certificateImageUrl !== "" ? null : signUpData.companyId,
        companyEmail: signUpData.certificateImageUrl !== "" ? null : signUpData.companyEmail,
      },
      verifyCompanyCertificateRequest: {
        companyName: signUpData.certificateImageUrl === "" ? null : signUpData.companyName,
        certificateImageUrl: signUpData.certificateImageUrl === "" ? null : signUpData.certificateImageUrl,
      }
    }
    try {
      console.log(payLoad);
      const response = await fetch(`https://moa-backend.duckdns.org/api/v1/user/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      });
  
      const data = await response.json();
      if(data.isSuccess) router.push(callbackId ? '/signup?step=6&callback=4' : '/signup?step=6')
      
      console.log(data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  }
  

  return (
    <>
      <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm'>
        {
          stepId > 1 ? 
            <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
            onClick={
              checkPrev
            }
          >
            이전
          </button>
          : null
        }
        
        <button className={`w-full h-[44px] grid place-items-center text-white font-semibold rounded-xl ${active[stepId-1]?.status ? 'bg-[#4338ca]' : 'bg-[#4338ca55] cursor-not-allowed'}`}
          onClick={
            nextStep
          }
        >
          {
            stepId === 6 ? '회원가입' : '다음'
          }
        </button>
      </div>
      </>
  )
}

export default JoinButton;
