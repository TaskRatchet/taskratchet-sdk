import fetch2 from "./fetch2";

type Input = {
  task: string;
  due: number;
  cents: number;
};

// Requires that user be authenticated.
export async function addTask(input: Input): Promise<Response> {
  const response = await fetch2("me/tasks", true, "POST", input);

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  return response;
}
