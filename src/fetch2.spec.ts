import fetch2 from "./fetch2";
import { describe, it, expect, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { API2_BASE } from "./constants";

describe("fetch2", () => {
  it("uses localStorage token", async () => {
    let headers: any;

    http.get(`${API2_BASE}/route`, ({ request }) => {
      headers = request.headers;
      return HttpResponse.json({});
    });

    const token = "token";

    global.localStorage.setItem("firebase_token", token);

    await fetch2("/route");

    vi.waitFor(() => {
      expect(headers).toEqual(
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    });
  });
});
