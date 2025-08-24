import fetch2 from "./fetch2";

export interface CheckoutSession {
  id: string;
}

export async function getCheckoutSession(): Promise<CheckoutSession> {
  const response = await fetch2("payments/checkout/session", false, "POST");

  return response.json() as Promise<CheckoutSession>;
}
