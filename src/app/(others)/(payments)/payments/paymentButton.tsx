'use client'

import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { useAsync } from "react-use";
import { Widget } from "@tosspayments/payment-widget__types/types/types/widget";
import { nanoid } from "nanoid"

const clientKey : any = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
const customerKey : any = nanoid();

const initializePaymentWidget = async () => {
  return await loadPaymentWidget(clientKey, customerKey);
};

const renderPaymentMethodsWidget : any = (paymentWidget: Widget, price: number) => {
  return paymentWidget.renderPaymentMethods("#payment-widget", { value: price }, { variantKey: "DEFAULT" });
};

const renderAgreementWidget = (paymentWidget: Widget) => {
  return paymentWidget.renderAgreement('#agreement', { variantKey: "AGREEMENT" });
};

export default function TossPaymentsButton() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
  const [price, setPrice] = useState(50000);

  useAsync(async () => {
    const paymentWidget = await initializePaymentWidget();
    const paymentMethodsWidget = renderPaymentMethodsWidget(paymentWidget, price);
    renderAgreementWidget(paymentWidget);

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget) {
      paymentMethodsWidget.updateAmount(price);
    }
  }, [price]);

  const handlePayment = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      if (paymentWidget) {
        await paymentWidget.requestPayment({
          orderId: "wnansqjsgh23",
          orderName: "moa23join",
          customerName: "김토스",
          customerEmail: "customer123@gmail.com",
          customerMobilePhone: "01012341234",
          successUrl: `${window.location.origin}/success`,
          failUrl: `${window.location.origin}/fail`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <button onClick={handlePayment}>결제하기</button>
    </main>
  );
}


/* export default async function success() {
  const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY
  const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

  const url = `https://api.tosspaymentx.com/v1/payments/orders/${searchParams.orderId}`;
  const payments = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "applecation/json",
    },
  }).then((res) => res.json());

  const { card } = payments;
  return(
    <div>
      <h1>결제가 완료되었습니다.</h1>
    </div>
  )
}
 */