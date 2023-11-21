// 'use client'
// import React, { useEffect, useState } from 'react'
// import styles from './CertPage.module.css'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { CertFormDataType } from '@/types/userDataType'
// import { useDisclosure } from '@nextui-org/react'
// import PublicModal from '@/components/(widget)/modal/Modal'

// const formatPhoneNumber = (number: string) => {
//     return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");};

// export const handleOnChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     certData: CertFormDataType,
//     setCertData: React.Dispatch<React.SetStateAction<CertFormDataType>>
// ) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//     setCertData({
//         ...certData,
//         [name]: checked
//     });
//     } else{ 
//     setCertData({
//         ...certData,
//         [name]: value
//     });
//     }
// }

// /* interface CertPageProps {
//   url: string;
//   setUrl: (newUrl: string) => void;
//   updateQueryParams: any;  // Ideally, provide a more specific type than 'any'
// } */


// export const handleLocalStorage = (name: String, phone: String, birth: String) => {
//     phone = formatPhoneNumber(phone.toString())
//     localStorage.setItem('tempName', name.toString())
//     localStorage.setItem('tempPhone', phone.toString())
//     localStorage.setItem('tempBirth', birth.toString())
// }

// export const checkId = async (name: String, phone: String) => {
//     try {
//     phone = formatPhoneNumber(phone?.toString() || "");

//     const response = await fetch(`https://smilekarina.duckdns.org/api/v1/member/findIdPw?userName=${name}&phone=${phone}`)
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
// }
// const data = await response.json();

//     if (data.success) {
//         return data.result.loginId
//     } else {

//         return undefined;
//     }
//     } catch (error) {
//     console.error("Error sending request:", error);

//     }
//     return undefined;
// }
// export const checkIdAdrr = async (name: String, phone: String) => {
//     try {
//     phone = formatPhoneNumber(phone?.toString() || "");

//     const response = await fetch(`https://smilekarina.duckdns.org/api/v1/member/findIdPw?userName=${name}&phone=${phone}`)
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const data = await response.json();

//     if (data.success) {
//         return data.result
//     } else {

//         return undefined;
//     }
//     } catch (error) {
//     console.error("Error sending request:", error);

//     }
//     return undefined;
// }

// export default function CertPage() {

// /*   const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
// const route = useRouter();
// const searchParams = useSearchParams()

// const [inputMeetingDatetime, setInputMeetingDatetime] = useState(searchParams.get('MeetingDatetime') || '');
// const { url, setUrl, updateQueryParams } = props;

// const selectedValue = React.useMemo(
//   () => Array.from(selectedKeys).join(", "),
//   [selectedKeys]
// );

// const handleNext = () => {
//   const baseURL = 'http://localhost:3000'; // Adjust as needed

//   const updatedUrl = updateQueryParams(baseURL, url, {
//     MeetingDatetime: inputMeetingDatetime,
//   });
//   setUrl(updatedUrl);
//   route.push(updatedUrl);
// };
//  */
//     const router = useRouter();
//     const pathname = usePathname();
//     const { isOpen, onOpen, onOpenChange } = useDisclosure();
//     const [modalContent, setModalContent] = useState<string>("");
//     const [routePath, setRoutePath] = useState<string>("");
//     const [certData, setCertData] = useState<CertFormDataType>({
//         loginId: '',
//         userName: '',
//         birth: '',
//         phone: '',
//         gender: 'M',
//         nationality: 'L',
//         agree1: false,
//         agree2: false,
//         agree3: false,
//         agree4: false,
//     });

//     const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { checked } = e.target;
//         setCertData(prevData => ({
//             ...prevData,
//             agree1: checked,
//             agree2: checked,
//             agree3: checked,
//             agree4: checked
//         }));
//     }
//     const isAllChecked = (): boolean => {
//         return !!certData.agree1 && !!certData.agree2 && !!certData.agree3 && !!certData.agree4;
//     }

//     useEffect(() => {
//         setRoutePath(pathname);
//     }, []);

//     const handleCertification = async () => {
//         if (routePath === '/cert') {
//             router.push('/join/form');

//         } else if (routePath === '/login/findPw') {
//             const result = await checkId(certData.userName, certData.phone)
//             if (result) {
//                 localStorage.setItem('loginId', result.toString())
//                 router.push('/login/findIdResult')
//             }
//             else {
//                 setModalContent("회원정보가 없습니다.\n정확한 정보를 입력하신 후 다시 시도해 주세요.");
//                 setRoutePath('/join')
//                 onOpen();
//             }

//         } else if (routePath === '/login/findPw') {
//             const result = await checkId(certData.userName, certData.phone)
//             if (result && result === certData.loginId) {
//                 localStorage.setItem('loginId', result.toString())

//                 router.push('/login/changePw')
//             }
//             else {
//                 setModalContent("입력한 아이디 정보와 본인인증 정보가 일치하지 않습니다.\n정확한 정보를 입력하신 후 다시 시도해 주세요.");
//                 setRoutePath('/login/findPw')
//                 onOpen();
//             }
//         }
//     }


//     return (
//         <div>
//             <div>
//                 <PublicModal isOpen={isOpen} onOpenChange={onOpenChange} content={modalContent} routePath={routePath} />
//             </div>
//             {/* <form> */}
//             <div className={styles.auth_tab}>
//                 <div className={styles.auth_tab_content}>
//                     <div className={styles.tab_cnt}>
//                         <h3 className="hidden">휴대폰인증</h3>
//                         <div>
//                             <div className={styles.tab_box0}>
//                                 <div className={styles.form_box}>
//                                     <p className={styles.tit}> 이름을 입력해 주세요. </p>
//                                     <div className={styles.input_box}>
//                                         <input name="userName" id="userName" type="text" placeholder='이름 입력' title="회원가입을 위해 입력해주세요."
//                                                   /* value={inputMeetingDatetime}
//                                             onChange={(e) => 
//                                             {handleOnChange(e, certData, setCertData); 
//                                             setInputMeetingDatetime(e.target.value);}}  */
//                                             onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                     </div>
//                                 </div>

//                                 {pathname !== "/login/findPw" ? (
//                                     <>
//                                         <div className={styles.form_box}>
//                                             <p className={styles.tit}> 성별을 선택해주세요.
//                                             </p>
//                                             <div className={`${styles.radio_group_box} ${styles.col2}`}>
//                                                 <div className={styles.radio_box}>
//                                                     <input id="radio00" type="radio" name="gender" value="M" defaultChecked
//                                                         onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                     <label htmlFor="radio00">남자</label>
//                                                 </div>
//                                                 <div className={styles.radio_box}>
//                                                     <input id="radio01" type="radio" name="gender" value="F"
//                                                         onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                     <label htmlFor="radio01">여자</label>
//                                                 </div>
//                                             </div>
//                                         </div><div className={styles.form_box}><p className={styles.tit}> 생년월일을 입력해주세요.
//                                             <em className="not-italic">(예: 19990101)</em>
//                                         </p>
//                                                 <div className={styles.input_box}>
//                                                     <input id="birthday" name='birthday' placeholder='법정생년월일 8자리' type="tel"
//                                                         onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                 </div>
//                                                 <p className={styles.error_txt}>
//                                                 </p>
//                                             </div>
//                                             </>
// ) : (
//                                         <div className={styles.form_box}>
//                                             <p className={styles.tit}> 아이디 </p>
//                                             <div className={styles.input_box}>
//                                                 <input name="userName" id="userName" type="text" placeholder='이름 입력' title="회원가입을 위해 입력해주세요."
//                                                     onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                             </div>
//                                             <p className={styles.error_txt}>
//                                             </p>
//                                     </div>
// )
// }

//                                 <div className={styles.form_box}>
//                                     <p className={styles.tit}> 본인명의의 휴대전화번호를 입력해주세요. </p>
//                                     <div className={styles.phone_select_box}>
//                                         <div className={styles.select_box}>
//                                             <select title="휴대전화 통신사 선택">
//                                                 <option value="01"> SKT </option>
//                                                 <option value="02"> KT </option>
//                                                 <option value="03"> LG U+ </option>
//                                                 <option value="04"> SKT 알뜰폰 </option>
//                                                 <option value="05"> KT 알뜰폰 </option>
//                                                 <option value="06"> LG U+ 알뜰폰 </option>
//                                             </select>
//                                         </div>
//                                         <div className={styles.input_box}>
//                                             <input id="phone" name='phone' maxLength={11} type="tel"
//                                                 placeholder='-없이 휴대폰 번호 입력'
//                                                 onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                         </div>
//                                     </div>
//                                     <p className={styles.error_txt}></p>
//                                 </div>
//                             </div>
//                             <div className={styles.terms_agree_box}>
//                                 <div className={styles.agree_form_box}>
//                                     <h3 className={styles.tit}> 휴대전화 인증 약관 </h3>
//                                     <div className={styles.agree_all_chk}>
//                                         <div className={styles.chk_box}>
//                                             <input id="agreeAllChk" type="checkbox" checked={isAllChecked()} onChange={handleAllCheck} />
//                                             <label htmlFor="agreeAllChk">모든 약관에 동의합니다.</label>
//                                         </div>
//                                     </div>
//                                     <ul className={styles.agree_list}>
//                                         <li className={styles.agree_form}>
//                                             <div className={styles.chk_box}>
//                                                 <input id="agree1" type="checkbox" className={styles.check_list_js} name='agree1' checked={!!certData.agree1} onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                 <label htmlFor="agree1">
//                                                     <span className={styles.in_box}>[필수] 휴대전화 인증 서비스 이용약관</span>
//                                                 </label>
//                                             </div>
//                                             <button className={styles.agree_show}>
//                                                 <span>내용보기</span>
//                                             </button>
//                                         </li>
//                                         <li className={styles.agree_form}>
//                                             <div className={styles.chk_box}>
//                                                 <input id="agree2" type="checkbox" className={styles.check_list_js} name='agree2' checked={!!certData.agree2} onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                 <label htmlFor="agree2">
//                                                     <span className={styles.in_box}>[필수] 고유식별정보 처리 동의</span>
//                                                 </label>
//                                             </div>
//                                             <button className={styles.agree_show}>
//                                                 <span>내용보기</span>
//                                             </button>
//                                         </li>
//                                         <li className={styles.agree_form}>
//                                             <div className={styles.chk_box}>
//                                                 <input id="agree3" type="checkbox" className={styles.check_list_js} name='agree3' checked={!!certData.agree3} onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                 <label htmlFor="agree3">
//                                                     <span className={styles.in_box}>[필수] 통신사 이용약관 동의</span>
//                                                 </label>
//                                             </div>
//                                             <button className={styles.agree_show}>
//                                                 <span>내용보기</span>
//                                             </button>
//                                         </li>
//                                         <li className={styles.agree_form}>
//                                             <div className={styles.chk_box}>
//                                                 <input id="agree4" type="checkbox" className={styles.check_list_js} name='agree4' checked={!!certData.agree4} onChange={(e) => handleOnChange(e, certData, setCertData)} />
//                                                 <label htmlFor="agree4">
//                                                     <span className={styles.in_box}>[필수] 개인정보 수집/이용동의</span>
//                                                 </label>
//                                             </div>
//                                             <button className={styles.agree_show}>
//                                                 <span>내용보기</span>
//                                             </button>
//                                         </li>
//                                         <li className={styles.agree_form} style={{ display: 'none' }}>
//                                             <div className={styles.chk_box}>
//                                                 <input id="agree04" type="checkbox" className={styles.add_check_list_js} />
//                                                 <label htmlFor="agree04">
//                                                     <span className={styles.in_box}>[필수] 제 3자 정보제공동의</span>
//                                                 </label>
//                                             </div>
//                                             <button className={styles.agree_show}>
//                                                 <span>내용보기</span>
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className={styles.tab_box1}>
//                                 <div className={styles.btn_box}>
//                                     <button className='bg-[#4338ca] w-full h-10 rounded-xl text-white font-semibold'
//                                         onClick={(e) => {
//                                             handleLocalStorage(certData.userName, certData.phone, certData.birth);
//                                             handleCertification();
//                                         }}> 인증번호 요청 </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className={styles.notice_box}>
//                 <h3 className={styles.tit}>[유의사항]</h3>
//                 <ul className={styles.list_cnt}>
//                     <li>본인 명의의 인증 수단 정보를 정확히 입력해 주세요.</li>
//                     <li>법인명의 휴대전화(법인폰)는 통신사에서 본인인증 서비스 신청 후 휴대폰 인증을 하실 수 있습니다.</li>
//                     <li>개명하신 회원님의 경우 통신사 등에 등록된 본인인증 정보가 개명하신 이름으로 바뀐 이후부터 자동으로 변경됩니다.</li>
//                     <li>인증 오류 시 코리아크레딧뷰로 고객센터 02-708-1000에 문의해 주세요.</li>
//                 </ul>
//             </div>
//         </div>
//     )
// }
import React from 'react'

export default function CertPage() {
    return (
        <div>CertPage</div>
    )
}

