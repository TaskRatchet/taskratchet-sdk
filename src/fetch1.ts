import { logout } from "./sessions";
import { trackRequest } from "./apiActivity";
import { API1_BASE } from "./constants";
import {
  AdapterExtraType,
  AdapterType,
  Client,
  HttpMethodsType,
  QueryParamsType,
  ResponseReturnType,
} from "@hyper-fetch/core";

const _trim = (s: string, c: string) => {
  if (c === "]") c = "\\]";
  if (c === "\\") c = "\\\\";
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
};

const client = new Client({ url: API1_BASE });

export default async function fetch1(
  route: string,
  protected_ = false,
  method: HttpMethodsType = "GET",
  data: unknown = null
): Promise<
  ResponseReturnType<
    unknown,
    unknown,
    AdapterType<
      Partial<XMLHttpRequest>,
      HttpMethodsType,
      number,
      AdapterExtraType,
      string | QueryParamsType,
      string
    >
  >
> {
  const token = window.localStorage.getItem("token");
  const route_ = _trim(route, "/");

  if (protected_ && !token) {
    throw new Error("User not logged in");
  }

  // noinspection SpellCheckingInspection
  const endTracking = trackRequest();
  try {
    const request = client
      .createRequest<unknown, unknown, unknown, unknown>()({
        endpoint: route_,
        method,
      })
      .setData(data);

    if (data) {
      request.setHeaders({ "Content-Type": "application/json" });
    }

    const response = await request.send({});

    if (response.status === 403) {
      logout();
    }

    return response;
  } finally {
    endTracking();
  }
}
