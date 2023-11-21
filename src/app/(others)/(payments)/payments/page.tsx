import React from 'react'
import TossPaymentsButton from './paymentButton'

function payments() {
  return (
    <>
    <TossPaymentsButton />
    </>
  )
}

export default payments



/* 'use client'

import { useEffect, useRef, useState } from "react" 
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk" 
import { useAsync } from "react-use" 

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
const customerKey = "adfjdskl1213"

export default function TossPaymentsButton() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null) 
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null) 
  const [price, setPrice] = useState(50000) 

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey)  // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS)  // 비회원 결제

    // ------  결제 UI 렌더링 ------
    // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      // 렌더링하고 싶은 결제 UI의 variantKey
      // 아래 variantKey는 문서용 테스트키와 연동되어 있습니다. 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
      // https://docs.tosspayments.com/guides/payment-widget/admin#멀티-결제-ui
      { variantKey: "DEFAULT" }
    ) 

    // ------  이용약관 UI 렌더링 ------
    // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement(
      '#agreement',
      { variantKey: "AGREEMENT" } // 기본 이용약관 UI 렌더링
    )
    paymentWidgetRef.current = paymentWidget 
    paymentMethodsWidgetRef.current = paymentMethodsWidget 
  }, []) 

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current 

    if (paymentMethodsWidget == null) {
      return 
    }

    // ------ 금액 업데이트 ------
    // 새로운 결제 금액을 넣어주세요.
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(
      price
    ) 
  }, [price]) 

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>주문서</h1>
      <span>{`${price.toLocaleString()}원`}</span>
      <div id="payment-widget" style={{ width: "100%" }} />
      <div id="agreement" style={{ width: "100%" }} />
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current 

          try {
            // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
            // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
            // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
            await paymentWidget?.requestPayment({
              orderId: "tMt42SMd_E1OL7khJFgeS",
              orderName: "토스 티셔츠 외 2건",
              customerName: "김토스",
              customerEmail: "customer123@gmail.com",
              customerMobilePhone: "01012341234",
              successUrl: `${window.location.origin}/success`,
              failUrl: `${window.location.origin}/fail`,
            }) 
          } catch (error) {
            // 에러 처리하기
            console.error(error) 
          }
        }}
      >
        결제하기
      </button>
    </main>
  ) 
} */


/* import TossPaymentsButton from '@/components/(ui)/Paymentbutton'
import React from 'react'

function payment() {
  return (
    <>
    <main>
      <TossPaymentsButton />
    </main>
    </>
  )
}

export default payment */