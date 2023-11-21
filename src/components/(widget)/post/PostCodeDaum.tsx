'use client'
import React from 'react'
import DaumPostcode from "react-daum-postcode";
import { useDaumPostcodePopup } from 'react-daum-postcode';

function PostCodeDaum({isView, setIsView, setAddress}: {isView: boolean, setIsView: any, setAddress: React.Dispatch<React.SetStateAction<any>>}) {

    const open = useDaumPostcodePopup();

    const complete = (data : any) =>{
        // let fullAddress = data.address;
        // let extraAddress = '';

        // if (data.addressType === 'R') {
        //     if (data.bname !== '') {
        //         extraAddress += data.bname;
        //     }
        //     if (data.buildingName !== '') {
        //         extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        //     }
        //     fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        // }
      
        setAddress(data)
    }
    const handleClick = () => {
        open({ onComplete: complete });
      };

  return (
    <div>
        <button type='button' onClick={handleClick}>
        우편번호 찾기 
    </button>
        {/* {
            isView &&
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} 
            />
        } */}
    </div>
  )
}

export default PostCodeDaum