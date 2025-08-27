import fetch2 from "./fetch2";

export interface TaskInput {
  complete?: boolean;
  uncle?: boolean;
}

// Requires that user be authenticated.
export async function updateTask(
  taskId: string,
  data: TaskInput
): Promise<Response> {
  return fetch2(`me/tasks/${taskId}`, true, "PUT", data);
}
