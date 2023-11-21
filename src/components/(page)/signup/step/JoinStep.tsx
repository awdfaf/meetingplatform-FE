'use client'

import IdInput from '@/components/(page)/signup/step/IdInput'
import PwInput from '@/components/(page)/signup/step/PwInput'
import { SignupType } from '@/types/SignupType'
import LinearProgress from '@mui/material/LinearProgress'
import { Card, CardBody } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import JoinButton from './JoinButton'
import FormArea from './FormArea'
import { useSearchParams } from 'next/navigation'
import { toInteger } from 'lodash'
import Jobverify from './Jobverify'
import CompanyCertVerify from './CompanyCertVerify'
import ConfirmSignup from './ConfirmSignup'

function JoinStep() {

  const [signUpData,setSignUpData]=useState<SignupType>({
    loginId : "", 
    password : "",
    checkPassword :"",
    phoneNumber : "",
    name : "",
    birthdate : "",
    nickname : "",
    gender : "MAN",
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
  const callbackId = toInteger(query?.get('callback'));

  const tabs = [
    {
      id: 1,
      label: "아이디 입력",
      progress: 10,
      content: <IdInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 2,
      label: "비밀번호 입력",
      progress: 30,
      content: <PwInput signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 3,
      label: "정보 입력",
      progress: 50,
      content: <FormArea signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 4,
      label: "직장 인증",
      progress: 70,
      content: <Jobverify signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 5,
      label: "직장 인증",
      progress: 70,
      content: <CompanyCertVerify signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
    {
      id: 6,
      label: "완료",
      progress: 90,
      content: <ConfirmSignup signUpData={signUpData} setSignUpData={setSignUpData} active={active} setActive={setActive} stepId={stepId}/>
    },
  ]

  useEffect(() => {
    console.log(callbackId);
    console.log(stepId);
    console.log(signUpData)
  }, [stepId]);

  return (
    <>
      <div className='m-auto mt-[100px]'>
      <div className='custom-lable' style={{
        left: `${tabs.find(tab => tab.id === stepId)?.progress}%`
      }}>{stepId}</div>
      <LinearProgress variant="determinate" value={tabs.find(tab => tab.id === stepId)?.progress} className='rounded-lg h-1 transition-all'/>
      </div>
      <div className="flex w-full flex-col bg-white">
        <Card>
          <CardBody>
            {tabs.find(tab => tab.id === stepId)?.content}
          </CardBody>
        </Card>
        </div>
        { 
          stepId !== 6 &&
          <JoinButton
            active={active}
            stepId={stepId}
            callbackId={callbackId}
            signUpData={signUpData}
          />
        }
        
    </>
  )
}

export default JoinStep