"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { StripeProvider } from "@/components/StripeProvider";
import { PaymentStatus } from "@/types/components";

// Dynamically import to avoid SSR issues with Stripe
const CheckoutForm = dynamic(() => import("@/components/CheckoutForm"), {
  ssr: false,
});

export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    loading: false,
    error: null,
    success: false,
    paymentIntentId: null,
  });

  const handleSuccess = (paymentIntentId: string) => {
    setPaymentStatus({
      loading: false,
      error: null,
      success: true,
      paymentIntentId,
    });
  };

  const handleError = (error: string) => {
    setPaymentStatus((prev) => ({
      ...prev,
      error,
      success: false,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 mb-8">$10.00 - One-time payment</p>

          <StripeProvider>
            <CheckoutForm
              amount={1000}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </StripeProvider>

          {paymentStatus.success && paymentStatus.paymentIntentId && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-green-800 font-medium">
                Payment Successful!
              </h3>
              <p className="text-green-700 text-sm mt-1">
                Your payment ID: {paymentStatus.paymentIntentId}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
