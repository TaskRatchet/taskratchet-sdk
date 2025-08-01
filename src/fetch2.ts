import { logout } from "./sessions";
import { trackRequest } from "./apiActivity";
import { API2_BASE } from "./constants";
import { getAuthToken } from "./auth";

const _trim = (s: string, c: string) => {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
};

export default async function fetch2(
  route: string,
  protected_ = false,
  method = "GET",
  data: unknown = null,
): Promise<Response> {
  const token = getAuthToken() || "";
  const route_ = _trim(route, "/");

  if (protected_ && !token) {
    throw new Error("User not logged in");
  }

  // noinspection SpellCheckingInspection
  const endTracking = trackRequest();
  try {
    const response = await fetch(API2_BASE + route_, {
      method: method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        ...(data ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 403) {
      logout();
    }

    return response;
  } finally {
    endTracking();
  }
}
