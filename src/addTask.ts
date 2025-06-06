import fetch2 from "./fetch2";

type Input = {
  task: string;
  due: number;
  cents: number;
};

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
export async function addTask(input: Input): Promise<Task> {
  const response = await fetch2("me/tasks", true, "POST", input);

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  return response.json();
}
