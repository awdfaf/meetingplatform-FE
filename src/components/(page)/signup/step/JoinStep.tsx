'use client'

import IdInput from '@/components/(page)/signup/step/IdInput'
import PwInput from '@/components/(page)/signup/step/PwInput'
import { SignupType } from '@/types/SignupType'
import LinearProgress from '@mui/material/LinearProgress'
import { Card, CardBody, Progress } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import JoinButton from './JoinButton'
import FormArea from '../FormArea'
import { useSearchParams } from 'next/navigation'
import { toInteger } from 'lodash'
import Jobverify from './Jobverify'
import CertVerify from '../after/CertVerify'

function JoinStep() {

  const [signUpData,setSignUpData]=useState<SignupType>({
    loginId : "", 
    password : "",
    checkPassword :"",
    phoneNumber : "",
    name : "",
    birthdate : "",
    nickname : "",
    gender : "M",
    emailNotificationStatus: false,
    smsNotificationStatus: false,
    pushNotificationStatus: false,
    companyId: "",
    companyEmail: "",
    companyName: "",
    certificateImageUrl: ""
  })

  const [active, setActive] = useState<any>(
    [
      { id : 1, status : false },
      { id : 2, status : false },
      { id : 3, status : false },
      { id : 4, status : false },
      { id : 5, status : false },
    ]
  );

  const query = useSearchParams();
  const stepId = toInteger(query?.get('step'));

  const tabs = [
    {
      id: 1,
      label: "아이디 입력",
      progress: 25,
      content: <IdInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 2,
      label: "비밀번호 입력",
      progress: 50,
      content: <PwInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 3,
      label: "정보 입력",
      progress: 75,
      content: <FormArea signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 4,
      label: "직장 인증",
      progress: 100,
      content: <Jobverify signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 5,
      label: "직장 인증",
      progress: 100,
      content: <CertVerify signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
  ]

  useEffect(() => {
    console.log(stepId);
    console.log(signUpData)
  }, [stepId]);


async function signUpRequest(signUpData: SignupType, endpoint: string) {
  try {
    const response = await fetch(`https://moa-backend.duckdns.org/api/v1/user/auth/signup${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
}

useEffect(() => {
  if (stepId === 4) {
    if (signUpData.companyId && signUpData.companyEmail) {
      signUpRequest(signUpData, '');
    } else if (signUpData.companyName && signUpData.certificateImageUrl) {
      signUpRequest(signUpData, '/certificate');
    }
  }
}, [signUpData, stepId]);

const handleJoin = () => {
  if (stepId === 4) {
    if (signUpData.companyId && signUpData.companyEmail) {
      signUpRequest(signUpData, '');
    } else if (signUpData.companyName && signUpData.certificateImageUrl) {
      signUpRequest(signUpData, '/certificate');
    }
  }
};

  
  return (
    <>
      <div className='m-auto mt-[100px]'>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === stepId)?.progress} className='rounded-lg h-1 transition-all'/>
      </div>
      <div className="flex w-full flex-col bg-white">
        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === stepId)?.content}
          </CardBody>
        </Card>
        </div>
      <JoinButton
        active={active} setActive={setActive}
        signUpData={signUpData} setSignUpData={setSignUpData}
        stepId={stepId} handleJoin={handleJoin}
      />
    </>
  )
}

export default JoinStep

/* 
  // 회사 이메일 signUp
async function signUpRequest(signUpData: SignupType) {
  try {
    const response = await fetch('https://moa-backend.duckdns.org/api/v1/user/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: signUpData.loginId,
        password: signUpData.password,
        name: signUpData.name,
        birthdate: signUpData.birthdate,
        gender: signUpData.gender,
        phoneNumber: signUpData.phoneNumber,
        nickname: signUpData.nickname,
        agreeAdvertiseRequest: {
          emailNotificationStatus: signUpData.emailNotificationStatus,
          smsNotificationStatus: signUpData.smsNotificationStatus,
          pushNotificationStatus: signUpData.pushNotificationStatus,
        },
        verifyCompanyEmailRequest: {
          companyId: signUpData.companyId,
          companyEmail: signUpData.companyEmail,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
}

  // 회사 이메일 signUp
  async function signUpcertRequest(signUpData: SignupType) {
    try {
      const response = await fetch('https://moa-backend.duckdns.org/api/v1/user/auth/signup/certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: signUpData.loginId,
          password: signUpData.password,
          name: signUpData.name,
          birthdate: signUpData.birthdate,
          gender: signUpData.gender,
          phoneNumber: signUpData.phoneNumber,
          nickname: signUpData.nickname,
          agreeAdvertiseRequest: {
            emailNotificationStatus: signUpData.emailNotificationStatus,
            smsNotificationStatus: signUpData.smsNotificationStatus,
            pushNotificationStatus: signUpData.pushNotificationStatus,
          },
          verifyCompanyCertificateRequest: {
            companyName: signUpData.companyName,
            certificateImageUrl: signUpData.certificateImageUrl,
          },
        }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  }

useEffect(() => {
  if (stepId === 4 && signUpData.companyId && signUpData.companyEmail) {
    // companyId와 companyEmail이 존재하면 API 호출
    signUpRequest(signUpData);
  } else if (stepId === 4 && signUpData.companyName && signUpData.certificateImageUrl) {signUpcertRequest(signUpData)
}}, [signUpData, stepId]);

const handleJoin = () => {
  if (stepId === 4 && signUpData.companyId && signUpData.companyEmail) {
  signUpRequest(signUpData);
} else if (stepId === 4 && signUpData.companyName && signUpData.certificateImageUrl) {signUpcertRequest(signUpData)
}
}; */

// ... (이전 코드)