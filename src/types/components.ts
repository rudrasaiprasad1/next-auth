import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";

export interface CheckoutFormProps {
  amount: number;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export interface PaymentStatus {
  loading: boolean;
  error: string | null;
  success: boolean;
  paymentIntentId: string | null;
}

export interface PaymentMethodFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
  email: string;
}
