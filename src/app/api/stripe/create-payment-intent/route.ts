import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  ApiResponse,
} from "@/types/api";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<CreatePaymentIntentResponse>>> {
  try {
    const body: CreatePaymentIntentRequest = await request.json();

    const { amount, currency = "usd", metadata, customerId } = body;

    // Validate amount
    if (!amount || amount < 50) {
      // Minimum 50 cents
      return NextResponse.json(
        { error: "Amount must be at least $0.50" },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: metadata || {},
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response: CreatePaymentIntentResponse = {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("Error creating payment intent:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create payment intent";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
