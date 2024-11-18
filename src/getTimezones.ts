import fetch1 from "./fetch1";

export async function getTimezones(): Promise<string[]> {
  const response = await fetch1("timezones");

  return response.data as Promise<string[]>;
}
