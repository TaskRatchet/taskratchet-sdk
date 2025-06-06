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

export async function getTasks({ page = 0 }: { page?: number } = {}): Promise<
  Task[]
> {
  const response = await fetch2(`me/tasks?page=${page}`, true);

  return response.json();
}
