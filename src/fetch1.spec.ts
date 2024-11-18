import { API1_BASE } from "./constants";
import fetch1 from "./fetch1";
import { describe, it, expect, vi } from "vitest";
import { http, HttpResponse } from "msw";

describe("fetch1", () => {
  it("uses localStorage token", async () => {
    let headers: any;

    http.get(`${API1_BASE}/route`, ({ request }) => {
      headers = request.headers;
      return HttpResponse.json({});
    });

    const token = "token";

    global.localStorage.setItem("token", token);

    await fetch1("/route");

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
