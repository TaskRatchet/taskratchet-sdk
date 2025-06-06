import fetch2 from "./fetch2";

interface Task {
  id: string;
  task: string;
  due: number;
  cents: number;
  complete: boolean;
  status: "pending" | "complete" | "expired";
  chargeStatus?: "notified" | "authorized" | "captured";
  contested?: boolean;
}

// Requires that user be authenticated.
export async function editTask(
  id: string,
  due: number,
  cents: number,
): Promise<Task> {
  const response = await fetch2(`me/tasks/${id}`, true, "PUT", {
    due,
    cents,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
