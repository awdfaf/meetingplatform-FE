'use client'

import React, { useEffect, useState } from 'react'
import styles from './LoginArea.module.css'
import Link from 'next/link';
import { LogInFormDataType } from '@/types/userDataType';
import { signIn, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicModal from '../../(widget)/modal/Modal';
import { useDisclosure } from '@nextui-org/react';
import NcLink from '@/components/NcLink/NcLink';
import Swal from 'sweetalert2';


export default function Loginarea() {
  const router = useRouter();
  const query = useSearchParams();
  const callBackUrl = query?.get('callbackUrl');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState<string>("");


  const isClient = typeof window !== 'undefined';

  const [loginData, setLoginData] = useState<LogInFormDataType>({
    loginId: '',
    password: '',
    isAutoId: false,
    isAutoLogin: false
  });
  const [pwType, setPwType] = useState<boolean>(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'isAutoId') {
      if (e.target.checked) {
        handleLocalStorage(loginData.loginId);
      } else {
        // 체크박스가 해제되면 로컬 스토리지의 값도 삭제
        localStorage.removeItem('autoLogin');
      }
    }
    if (name === 'isAutoId' || name === 'isAutoLogin') {

      setLoginData({
        ...loginData,
        [name]: e.target.checked
      })
    } else {

      setLoginData({
        ...loginData,
        [name]: value
      })
    }
  }

  const handleLocalStorage = (loginId: String) => {
    localStorage.setItem('autoLogin', loginId.toString())
  }

  const handlePwType = () => {
    setPwType(!pwType)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const autoLogin = isClient && localStorage.getItem('autoLogin') || '';

      if (autoLogin) {
        setLoginData({
          ...loginData,
          loginId: autoLogin,
          isAutoId: true
        })
      }
    }
  },
    // []
  )

  const handleLogin = async () => {

    console.log(loginData)
    const result = await signIn('credentials', {
      loginId: loginData.loginId,
      password: loginData.password,
      redirect: false,
      callbackUrl: callBackUrl ? callBackUrl : '/'
    })

    if (result?.error) {
      Swal.fire({
        text: `아이디 비빌번호를 확인 후 다시 시도해주세요.`,
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
  };


  return (
    <div>
      <div>
        {/* <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent} /> */}
      </div>
      <p className='mt-4 font-semibold'>아이디</p>
      <div className={styles.input_box}>
        <input id="loginId"
          name="loginId"
          type="text"
          placeholder="example@example.com"
          onChange={handleOnChange}
          defaultValue={loginData.loginId}
          title="로그인을 위해 아이디를 입력해주세요." />
      </div>

      <p className='flex justify-between font-semibold'>
        비밀번호
        <span>
          <Link href="/findIdPw" className='text-[13px] text-blue-600 underline'>아이디·비밀번호 찾기</Link>
        </span>
      </p>
      <div className={styles.input_box}>
        <input id="password"
          name='password'
          type={pwType ? 'password' : 'text'}
          onChange={handleOnChange}
          title="로그인을 위해 비밀번호를 입력해주세요." />
        <button type="button" onClick={handlePwType}>
          <Link href="/" id="pw00_btn" className={styles.ico_eye_slash}>비밀번호 보기</Link>
        </button>
      </div>
      <div className='grid place-items-center mt-8'>
        <button onClick={handleLogin} className='h-[44px] w-[300px] bg-[#4338ca] rounded-2xl grid place-items-center text-white font-semibold'>로그인</button>
      </div>
      <ul className='grid place-items-center'>
        {/*         <li>
          <Link href="/login/findId" className={styles.btn}>아이디 찾기</Link>
        </li>
        <li>
          <Link href="/login/findPw" className={styles.btn}>비밀번호 찾기</Link>
        </li> */}

        <li className='mt-4'>
          <span>아직 회원이 아니신가요?</span>
          <a href="/join" className='text-blue-400 font-semibold underline'>회원가입</a>
        </li>
      </ul>


    </div>

  )
}
