import fetch2 from "./fetch2";

export async function getApiToken() {
  const response = await fetch2("me/token", true, "POST");
  return response?.text();
}
