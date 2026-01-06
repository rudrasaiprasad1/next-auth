export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
  customerId?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface WebhookEvent<T = any> {
  id: string;
  type: string;
  data: {
    object: T;
  };
  created: number;
}

export interface PaymentVerificationResponse {
  status: string;
  amount: number;
  currency: string;
  customerId?: string;
  createdAt: number;
}
