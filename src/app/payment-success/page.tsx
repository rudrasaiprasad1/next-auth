"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentVerificationResponse } from "@/types/api";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const [payment, setPayment] = useState<PaymentVerificationResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentIntentId) {
        setError("No payment intent found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/verify-payment?payment_intent=${paymentIntentId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify payment");
        }

        setPayment(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Verifying payment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>

          {payment && (
            <>
              <p className="text-gray-600 mb-4">
                Thank you for your payment of $
                {(payment.amount / 100).toFixed(2)}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 text-left mt-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Status:</div>
                  <div className="font-medium capitalize">{payment.status}</div>

                  <div className="text-gray-500">Amount:</div>
                  <div className="font-medium">
                    ${(payment.amount / 100).toFixed(2)}{" "}
                    {payment.currency.toUpperCase()}
                  </div>

                  <div className="text-gray-500">Date:</div>
                  <div className="font-medium">
                    {new Date(payment.created * 1000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
