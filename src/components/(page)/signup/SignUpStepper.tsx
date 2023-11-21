import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import CertPage from './CertPage';
import { SignUpFormDataType } from '@/types/userDataType';

function SignUpStepper() {
  const router = useRouter();

  //   const [signupData, setSignupData] = useState<SignUpFormDataType>({
  //     loginId: '',
  //     password: '',
  //     userName: '',
  //     phone: '',
  //     zoneCode: '',
  //     address: '',
  //     detailAddress: '',
  //     birth: '',
  //     nickName: '',
  //     agree3: false,
  //     agree4: false,
  //     agree5: false,
  //     // agree6: false
  // })

  const [stepId, setStepId] = useState<number>(1);

  const stepperComponent: any = [
    {
      1: <CertPage />,
    }
  ]
  return (
    <div></div>
  )
}

export default SignUpStepper