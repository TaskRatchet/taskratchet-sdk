import fetch1 from "./fetch1";

export interface MeInput {
  name?: string | null;
  email?: string | null;
  timezone?: string | null;
  beeminder_token?: string | null;
  beeminder_user?: string | null;
  beeminder_goal_new_tasks?: string | null;
  checkout_session_id?: string | null;
}

export async function updateMe(input: MeInput): Promise<Response> {

  const response = await fetch1("me", true, "PUT", input);

  if (!response.ok) {
    throw new Error("Failed to update me");
  }

  return response;
}
