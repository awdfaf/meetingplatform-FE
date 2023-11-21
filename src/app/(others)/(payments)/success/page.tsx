'use client'
import Image from 'next/image';

// 필요한 패키지와 라이브러리를 import 합니다.
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Payment 객체를 정의합니다.
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
  paymentKey: string;
  orderId: string;
}

interface ErrorResponse {
  code: string;
  message: string;
  // 다른 필요한 속성들을 추가할 수 있습니다.
}

// SuccessPage 컴포넌트를 정의합니다.
const SuccessPage: React.FC = () => {
  // payment 상태와 setPayment 함수를 선언합니다.
  const [payment, setPayment] = useState<Payment | null>(null);



const searchParams = useSearchParams();

// API를 호출하여 결제 정보를 가져오는 함수
const fetchData = async () => {
  try {
    const response = await axios.post<Payment>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey: searchParams?.get("paymentKey"),
        orderId: searchParams?.get("orderId"),
        amount: searchParams?.get("amount"),
      },
      {
        headers: {
          Authorization: "Basic dGVzdF9za19EbnlScFFXR3JOd2dLRDJuS3kwQjhLd3YxTTlFOg==",
        },
      }
    );

    // response.data에 실제 응답 데이터가 들어 있습니다.
    const paymentData: Payment = response.data;

    // 가져온 데이터를 상태에 저장합니다.
    setPayment(paymentData);
  } catch (error:any) {
    console.error('Error fetching data:', error);

    // 에러가 발생하면 에러 페이지로 리다이렉션합니다.
    const responseData: ErrorResponse = (error as any)?.response?.data || { code: 'UNKNOWN', message: 'Unknown error' };
    const redirectUrl = `/fail?code=${responseData.code}&message=${encodeURIComponent(responseData.message)}`;
    window.location.href = redirectUrl;
  }
};

// useEffect를 사용하여 API 호출을 수행합니다.
useEffect(() => {
  // fetchData 함수를 호출하여 데이터를 가져옵니다.
  fetchData();
}, [searchParams]);

// 결제 정보가 로드되지 않은 경우 로딩 메시지를 반환합니다.
if (!payment) {
  return <div>Loading...</div>;
}

interface Props {
  payment: Payment;
}

  // 결제 정보가 로드된 경우 UI를 렌더링합니다.
  return (
    <main>
      <div className="result wrapper">
        <div className="box_section">
          <h2 style={{ padding: '20px 0px 10px 0px' }}>
            <Image
            height={35}
              width={35}
              src="https://static.toss.im/3d-emojis/u1F389_apng.png"
              alt='성공 이미지'
            />
            결제 성공
          </h2>
          <p>paymentKey = {payment.paymentKey}</p>
          <p>orderId = {payment.orderId}</p>
          <p>amount = {payment.totalAmount.toLocaleString()}원</p>

          <div>
            <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
              <button className="button" style={{ marginTop: '30px', marginRight: '10px' }}>연동 문서</button>
            </Link>
            <Link href="https://discord.gg/A4fRFXQhRu">
              <button className="button" style={{ marginTop: '30px', backgroundColor: '#e8f3ff', color: '#1b64da' }}>실시간 문의</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;

  // useEffect를 사용하여 API 호출을 수행합니다.
/*   useEffect(() => {
    // URL에서 쿼리 파라미터를 추출합니다.
    const searchParams = new URLSearchParams(window.location.search);
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
  }; */
    // API를 호출하여 결제 정보를 가져옵니다.
/*     const fetchData = async () => {
      try {
        const { data } = await axios.post<Payment>(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            paymentKey,
            orderId,
            amount,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`
              ).toString('base64')}`,
            },
          }
        ); */
        // API를 호출하여 결제 정보를 가져옵니다.
/* const fetchData = async () => {
  try {
    const response = await axios.post<Payment>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: "Basic dGVzdF9za19EbnlScFFXR3JOd2dLRDJuS3kwQjhLd3YxTTlFOg==",
        },
        body: JSON.stringify(requestData),
      }
    );
    console.log(payment)
    return {
      props: { payment },
    };
  } catch (err: any) {
    console.error("err", err.response.data);

    return {
      redirect: {
        destination: `/fail?code=${err.response.data.code}&message=${encodeURIComponent(err.response.data.message)}`,
        permanent: false,
      },
    };
  }
}; */

/* 
    // response.data에 실제 응답 데이터가 들어 있습니다.
    const paymentData: Payment = response.data;

        // 가져온 데이터를 상태에 저장합니다.
        setPayment(paymentData);
      } catch (error:any) {
        console.error('Error fetching data:', error);

        // 에러가 발생하면 에러 페이지로 리다이렉션합니다.
        const responseData: ErrorResponse = (error as any)?.response?.data || { code: 'UNKNOWN', message: 'Unknown error' };
        const redirectUrl = `/fail?code=${responseData.code}&message=${encodeURIComponent(responseData.message)}`;
        window.location.href = redirectUrl;
      }
    };

    // fetchData 함수를 호출하여 데이터를 가져옵니다.
    fetchData();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  // 결제 정보가 로드되지 않은 경우 로딩 메시지를 반환합니다.
  if (!payment) {
    return <div>Loading...</div>;
  } */
