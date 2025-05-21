import fetch2 from "./fetch2";

// Requires that user be authenticated.
export async function editTask(
  id: string,
  due: number,
  cents: number,
): Promise<Response> {
  const response = await fetch2(`me/tasks/${id}`, true, "PUT", {
    due,
    cents,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response;
}
