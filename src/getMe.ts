import fetch2 from "./fetch2";

export type Card = {
  brand: string;
  last4: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  timezone: string;
  integrations: {
    beeminder: {
      user: string;
      goal_new_tasks: string;
    };
  };
  has_stripe_customer: boolean;
  api2_token: string | undefined;
};

export async function getMe(): Promise<User> {
  const response = await fetch2("me", true);

  if (!response.ok) {
    throw new Error("Failed to get me");
  }

  return response.json() as Promise<User>;
}
