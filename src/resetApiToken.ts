import fetch2 from "./fetch2";

/**
 * Resets the API token for the current user by sending a POST request to the "me/token" endpoint.
 *
 * @returns {Promise<string>} A promise that resolves to the response text containing 
 * the new API token.
 */
export async function resetApiToken(): Promise<string> {
  const response = await fetch2("me/token", true, "POST");
  return response.text();
}
