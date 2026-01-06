import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ApiResponse, PaymentVerificationResponse } from "@/src/types/api";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<PaymentVerificationResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get("payment_intent");

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Payment intent ID is required" },
        { status: 400 }
      );
    }

    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const response: PaymentVerificationResponse = {
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customerId: paymentIntent.customer as string | undefined,
      createdAt: paymentIntent.created,
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error verifying payment:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to verify payment";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
