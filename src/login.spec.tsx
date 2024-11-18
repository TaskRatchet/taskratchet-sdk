import { login } from "./login";
import { expect, it, describe, vi, beforeEach } from "vitest";
import { signInWithEmailAndPassword } from "firebase/auth";
import { http, HttpResponse } from "msw";
import { API1_BASE } from "./constants";

vi.mock("firebase/auth");

describe("login", () => {
  beforeEach(() => {
    vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
      user: {
        getIdToken: () => Promise.resolve("token"),
      },
    } as any);
  });

  it("stores session token on successful login", async () => {
    // fetchMock.mockResponse("token");
    http.post(`${API1_BASE}/account/login`, () => {
      return HttpResponse.json("token");
    });

    await login("test", "test");

    vi.waitFor(() => {
      expect(window.localStorage.getItem("token")).toBe("token");
    });
  });

  it("stores session email on successful login", async () => {
    // fetchMock.mockResponse("token");
    http.post(`${API1_BASE}/account/login`, () => {
      return HttpResponse.json("token");
    });

    await login("test", "test");

    vi.waitFor(() => {
      expect(window.localStorage.getItem("email")).toBe("test");
    });
  });
});
