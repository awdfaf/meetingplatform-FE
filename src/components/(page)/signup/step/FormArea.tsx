'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './FormArea.module.css'
import { SignUpFormDataType } from '@/types/userDataType'
import { useRouter } from 'next/navigation'
import { DaumAddressType } from '@/types/DaumAddressType';
import { SignupType } from '@/types/SignupType';

interface IdInputProps {
  signUpData: SignupType;
  setSignUpData: React.Dispatch<React.SetStateAction<SignupType>>;
  active: any;
  setActive: React.Dispatch<React.SetStateAction<any>>;
  stepId: number;
}

export default function FormArea({ signUpData, setSignUpData, active, setActive, stepId }: IdInputProps) {

  const nicknamePattern = /^[a-zA-Z0-9]{3,10}$/;
  const birthdatePattern = /^\d{8}$/;
  const phoneNumberPattern = /^\d{11}$/;

  const [allCheck, setAllCheck] = useState<boolean>(false)
  const [error, setError] = useState({
    name: '',
    nickname: '',
    birthdate: '',
    phoneNumber: '',
  });
  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    if( name === 'name' && value === '') {
      setError({
        ...error,
        name: '이름을 입력해주세요.',
      });
    } else {
      setError({
        ...error,
        name: '',
      });
    }
    if (name === 'nickname' && !nicknamePattern.test(value)) {
      setError({
        ...error,
        nickname: '닉네임 형식에 맞게 입력해주세요.',
      });
    } else {
      setError({
        ...error,
        nickname: '',
      });
    }
    if (name === 'birthdate' && !birthdatePattern.test(value)) {
      setError({
        ...error,
        birthdate: '생년월일 형식에 맞게 입력해주세요.',
      });
    } else {
      setError({
        ...error,
        birthdate: '',
      });
    }
    if (name === 'phoneNumber' && !phoneNumberPattern.test(value)) {
      setError({
        ...error,
        phoneNumber: '휴대폰번호 형식에 맞게 입력해주세요.',
      });
    } else {
      setError({
        ...error,
        phoneNumber: '',
      });
    }

    if(error.birthdate === '' || error.name === '' || error.nickname === '' || error.phoneNumber === '') {
      setActive(
        {
          ...active,
          [stepId-1]: {
            id: stepId,
            status: true,
          },
        }
      )
    } 

    setSignUpData({
      ...signUpData,
      [name]: value,
    });

  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  }

  const handleCheck = ( value:string ) => {
    if (value === 'emailNotificationStatus') {
      setSignUpData(prevData => ({
        ...prevData,
        emailNotificationStatus: !prevData.emailNotificationStatus,
      }));
    } else if (value === 'smsNotificationStatus') {
      setSignUpData(prevData => ({
        ...prevData,
        smsNotificationStatus: !prevData.smsNotificationStatus,
      }));
    } else if (value === 'pushNotificationStatus') {
      setSignUpData(prevData => ({
        ...prevData,
        pushNotificationStatus: !prevData.pushNotificationStatus,
      }));
    }
  }
  const handleAllCheck = () => {
    const checked = !allCheck;
    setSignUpData(prevData => ({
        ...prevData,
        emailNotificationStatus: checked,
        smsNotificationStatus: checked,
        pushNotificationStatus: checked,
    }));
  }

  useEffect(() => {
    console.log(signUpData);
    if(signUpData.emailNotificationStatus && signUpData.smsNotificationStatus && signUpData.pushNotificationStatus) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [signUpData]);



    return (
      <main className='container mt-10 mb-5'>
        <div className='tracking-tighter mb-8'>
          <p className='text-lg font-semibold text-center'>개인정보 입력</p>
          <p className="text-xs text-center text-gray-500">정확한 정보를 입력하시면 보다 좋은 추천이 가능해집니다.</p>
        </div>
        <div className='flex flex-col justify-center items-center relative'>
          <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
            <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>이름</label>
            <input
              className='border-2 border-[#E5E7EB] text-[0.7rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
              type="text"
              name="name"
              onChange={handleOnChange}
              defaultValue={signUpData.name}
              placeholder='이름을 입력해주세요.'
            />
            {error.name !== '' && (
            <p className="text-red-500 text-xs mt-1 mb-3 ml-5 text-left">{error.name}</p>
            )}
          </div>
          <div className='flex justify-between items-center gap-2 md:w-[80%] w-full'>
            <div className='flex flex-col mt-3 justify-start w-1/3 transition-all'>
              <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>선택</label>
              <select 
                name="gender"
                className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
                onChange={handleSelectChange}
                defaultValue={signUpData.gender}
              >
                <option value="MAN">남자</option>
                <option value="WOMAN">여자</option>
              </select>
              {error.nickname !== '' && (
                <p className="text-white text-xs mt-1 ml-5 text-left">1</p>
              )}
            </div>
            <div className='flex flex-col mt-3 justify-start w-2/3 transition-all'>
              <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>닉네임</label>
              <input 
                type="text"
                name="nickname"
                className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
                onChange={handleOnChange}
                defaultValue={signUpData.nickname}
                placeholder='3~10자리로 입력'
              />
              {error.nickname !== '' && (
                <p className="text-red-500 text-xs mt-1 ml-5 text-left">{error.nickname}</p>
              )}
            </div>
          </div>
          <div className='flex flex-col mt-3 justify-start md:w-[80%] w-full transition-all'>
            <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>생년월일</label>
            <input 
              type="text"
              name="birthdate"
              className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
              onChange={handleOnChange}
              placeholder='20231212와 같이 8자리로 입력'
              defaultValue={signUpData.birthdate}
            />
            {error.birthdate && (
              <p className="text-red-500 text-xs mt-1 ml-5 text-left">{error.birthdate}</p>
            )}
          </div>
          <div className='mb-8 flex flex-col mt-3 justify-start md:w-[80%] w-full transition-all'>
            <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>전화번호</label>
            <input 
              type="text"
              name="phoneNumber"
              className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-6 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
              onChange={handleOnChange}
              defaultValue={signUpData.phoneNumber}
              placeholder='01012345678와 같이 11자리로 입력'
            />
            {error.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 ml-5 text-left">{error.phoneNumber}</p>
            )}
          </div>
          <p className='my-3 font-bold'>모아 광고정보 수신동의</p>
          <div className='flex flex-col w-full md:w-[80%] p-4 text-sm bg-slate-100 rounded-lg'>
            <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={handleAllCheck}>
              <p 
                className={allCheck ? `check-btn active` : 'check-btn'}></p>
              <p className='agree-check'>전체동의</p>
            </div>
            <tr className='border-b-2 border-white my-4'></tr>
            <div className='flex justify-start items-center gap-5'>
              <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={()=>handleCheck('emailNotificationStatus')}>
                <p 
                  className={signUpData.emailNotificationStatus ? `check-btn active` : 'check-btn'}></p>
                <p className='agree-check'>이메일</p>
              </div>
              <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={()=>handleCheck('smsNotificationStatus')}>
                <p 
                  className={signUpData.smsNotificationStatus ? `check-btn active` : 'check-btn'}></p>
                <p className='agree-check'>문자</p>
              </div>
              <div className='flex justify-start items-center gap-2 cursor-pointer' onClick={()=>handleCheck('pushNotificationStatus')}>
                <p 
                  className={signUpData.pushNotificationStatus ? `check-btn active` : 'check-btn'}></p>
                <p className='agree-check'>PUSH</p>
              </div>
            </div>
          </div>
        </div>
      </main>
        
    )
}

{/* <main className='grid place-items-center'>
          <div>
          </div>

          <div className='mt-5 tracking-tighter'>

            <div className='w-[290px] font-semibold'>
              <p className='text-xl leading-10'>정보를 입력하고</p>
              <p className='text-xl leading-10'><span className='text-[#4338ca]'>moA</span>의 <br />커뮤니티로 모여주세요!</p>
            </div>
              <div className={`mt-10 ${styles.form_box}`}>
                  <p className={styles.tit}> 이름 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="name" name='name' title="이름" />
                  </div>
              </div>

              <div className='flex gap-3'>
                <div className={`${styles.form_box}`}>
                    <p className={styles.tit}> 성별 <span className="hidden">필수항목</span></p>
                      <select name="gender" id="gender">
                        <option value="M" deta-id="gender">남자</option>
                        <option value="W" deta-id="gender">여자</option>
                      </select>
                </div>

                <div className={`${styles.form_box}`}>
                    <p className={styles.tit}> 닉네임 <span className="hidden">필수항목</span></p>
                    <div className={styles.input_box}>
                        <input type="nickname" id="nickname" name='nickname'
                            placeholder='3~10자리로 입력' title="회원 가입을 위한 닉네임 입력"
                            onChange={handleOnChange} />
                    </div>
                    <p className={styles.error_txt}> 닉네임 형식에 맞게 입력해주세요. </p>
                </div>
              </div>

              <div className={`${styles.form_box}`}>
                  <p className={styles.tit}> 생년월일 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="birthdate" name='birthdate' title="생년월일" placeholder='20231212와 같이 8자리로 입력' 
                      pattern="[0~9]{8}" onChange={handleOnChange} required
                      />
                  </div>
              </div>

              <div className={`${styles.form_box}`}>
                  <p className={styles.tit}> 휴대폰번호 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_box}>
                      <input type="text" id="phoneNumber" name='phoneNumber' title="휴대폰번호" />
                  </div>
              </div>


          </div>
          <div className='my-5'>
              <div className={styles.agree_form_box}>
                  <div className='border p-1 rounded-lg bg-[#eef2ff] w-[250px]'>
                    <p> 모아 광고정보 수신동의 </p>
                    <div className='mt-3'>
                      <input id="receiveAllspoint" type="checkbox" value="0" checked={isAllChecked()} onChange={handleAllCheck} className='rounded-sm'/>
                        <label htmlFor="receiveAllspoint" className='ml-2'>전체동의</label>
                      </div>

                      <div className='flex mt-3'>
                        <div>
                          <input id="receivespoint0" type="checkbox" name='emailNotificationStatus' checked={!!signUpData.emailNotificationStatus} onChange={handleOnChange} className='rounded-sm'/>
                          <label htmlFor="receivespoint0" className='ml-2'>이메일</label>
                        </div>
                        <div className='ml-4'>
                          <input id="receivespoint1" type="checkbox" name='smsNotificationStatus' checked={!!signUpData.smsNotificationStatus} onChange={handleOnChange} className='rounded-sm' />
                          <label htmlFor="receivespoint1" className='ml-2'>문자</label>
                        </div>
                        <div className='ml-4'>
                          <input id="receivespoint2" type="checkbox" name='pushNotificationStatus' checked={!!signUpData.pushNotificationStatus} onChange={handleOnChange} className='rounded-sm' />
                          <label htmlFor="receivespoint2" className='ml-2'>push</label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className='text-xs tracking-tighter font-semibold text-[#767676]'>
            <p className='mb-2'>
              가입을 진행할 경우, 서비스약관 및 개인정보처리방침에 동의한 것으로 간주합니다.
            </p>
            <p>
              push 알림을 동의할 시, 직장 인증완료 알림을 받을 수 있습니다.
            </p>
            <p>
                (push 알림을 받으시려면 앱 권한 설정을 변경하셔야 합니다.)
            </p>
          </div>
          </main> */}