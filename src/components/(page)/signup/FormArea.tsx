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

  const [error, setError] = useState<string | null>(null);
  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;

    const nicknamePattern = /^[a-zA-Z0-9]{3,10}$/;
    const birthdatePattern = /^\d{8}$/;
    const phoneNumberPattern = /^\d{11}$/;

    if(
    (name === "name" || name === "gender") ||
    (name === "nickname" && nicknamePattern.test(value)) ||
    (name === "phoneNumber" && phoneNumberPattern.test(value)) ||
    (name === "birthdate" && birthdatePattern.test(value))
    )
    {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
        // 유효성 검사를 통과했을 때 active 활성화
        setActive({
          ...active,
          [stepId - 1]: {
            id: stepId,
            status: true, // 여기서 true는 활성화를 나타냅니다. 필요에 따라 조절하십시오.
          },
        });
      } else {
        // 유효성 검사를 통과하지 못했을 때 active 비활성화
        setActive({
          ...active,
          [stepId - 1]: {
            id: stepId,
            status: false, // 여기서 false는 비활성화를 나타냅니다. 필요에 따라 조절하십시오.
          },
        });
      }
    };






  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSignUpData(prevData => ({
        ...prevData,
        emailNotificationStatus: checked,
        smsNotificationStatus: checked,
        pushNotificationStatus: checked,
    }));
}

const isAllChecked = (): boolean => {
    return !!signUpData.emailNotificationStatus && !!signUpData.smsNotificationStatus && !!signUpData.pushNotificationStatus/* && !!signupData.agree6*/;
}



    return (
      <>
        <main className='grid place-items-center'>
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
          </main>
        </>
    )
}


/* //sequence부분
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const route = useRouter();
  const searchParams = useSearchParams()

  const [inputThemeCategoryId, setInputThemeCategoryId] = useState(searchParams.get('ThemeCategoryId') || '');
  const { url, setUrl, updateQueryParams } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleNext = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      ThemeCategoryId: inputThemeCategoryId,
    });
    setUrl(updatedUrl);
    route.push(updatedUrl);
  }; */

                /* 주소 정보 */
/*               <div className={`${styles.form_box} ${styles.required}`}>
                  <p className={styles.tit}> 자택주소 <span className="hidden">필수항목</span></p>
                  <div className={styles.input_address_box}>
                      <div className={`${styles.input_btn_box} ${styles.w_type2}`}>
                          <div className={styles.input_box}>
                              <input type="text" id="zoneCode" name='zoneCode' value={signupData.zoneCode.toString()} readOnly placeholder='우편번호' />
                          </div>
                          <div className={styles.btn_box}>
                              <div className='border rounded-xl h-[45px] leading-[45px] px-2 bg-[#4338ca] font-semibold text-white'> 
                              <PostCodeDaum isView={isView} setIsView={setIsView} setAddress={setAddress} /></div>
                          </div>
                      </div>
                      <div className={`${styles.input_box} mb-2`}>
                          <input type="text" id="address" name='address' value={signupData.address.toString()} readOnly placeholder='주소' />
                      </div>
                      <div className={styles.input_box} >
                          <input type="text" id="detailAddress" name='detailAddress' placeholder='상세주소' onChange={handleOnChange} />
                      </div>
                  </div>
              </div> */

/*               <div className={styles.btn_box}>
                  <button className='w-full mt-14 h-10 rounded-xl bg-[#4338ca] text-white'
                      onClick={() => {
                          handleSignUp();
                      }}>확인</button>
              </div> */