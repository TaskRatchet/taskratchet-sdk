import fetch2 from "./fetch2";

export interface CheckoutSession {
  id: string;
}

export interface CheckoutSessionOptions {
  success_url: string;
  cancel_url: string;
}

export async function getCheckoutSession(
  options: CheckoutSessionOptions
): Promise<CheckoutSession> {
  const response = await fetch2(
    "payments/checkout/session",
    false,
    "POST",
    options
  );

  return response.json() as Promise<CheckoutSession>;
}
