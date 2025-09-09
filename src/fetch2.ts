import { logout } from "./sessions";
import { trackRequest } from "./apiActivity";
import { API2_BASE } from "./constants";
import { getAuthToken } from "./auth";

const _trim = (s: string, c: string) => {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
};

/**
 * Perform an HTTP request against the API base URL, returning the raw Response.
 *
 * Normalizes the provided route, adds a Bearer authorization header using the async auth token,
 * and sends `data` as a JSON body when provided. If `protected_` is true and no token is available,
 * an Error is thrown. If the response status is 403 the user will be logged out. Request activity
 * is tracked for the duration of the call.
 *
 * @param route - API route (leading/trailing slashes will be trimmed)
 * @param protected_ - If true, requires a valid auth token or throws Error("User not logged in")
 * @param method - HTTP method to use (default: "GET")
 * @param data - Request payload to be JSON-stringified and sent as the request body (optional)
 * @returns A Promise that resolves to the fetch Response object
 * @throws Error If `protected_` is true but no authentication token is available
 */
export default async function fetch2(
  route: string,
  protected_ = false,
  method = "GET",
  data: unknown = null
): Promise<Response> {
  const token: string = (await getAuthToken()) || "";
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
