import { describe, it, expect, vi, beforeEach } from "vitest";
import fetch1 from "./fetch1";
import fetch2 from "./fetch2";
import { API1_BASE } from "./constants";
import { http, HttpResponse } from "msw";

let mod: typeof import("./apiActivity");

describe("apiActivity", () => {
  beforeEach(async () => {
    vi.resetModules();
    mod = await import("./apiActivity");
  });

  it("notifies when requests start and end", async () => {
    const callback = vi.fn();
    mod.subscribeToApiActivity(callback);

    const resolver = vi.fn();

    http.get(`${API1_BASE}/test`, resolver);

    let resolve1: any;
    const promise1 = new Promise<any>((resolve) => {
      resolve1 = resolve;
    });

    let resolve2: any;
    const promise2 = new Promise<any>((resolve) => {
      resolve2 = resolve;
    });

    resolver.mockReturnValueOnce(promise1);
    resolver.mockReturnValueOnce(promise2);

    // Start first request
    fetch1("/test");

    vi.waitFor(() => {
      expect(callback).toHaveBeenLastCalledWith(true);
    });

    // Start second request while first is in flight
    fetch2("/test");
    expect(callback).toHaveBeenCalledTimes(1); // No new call since already active

    // Complete both requests
    resolve1({ status: 200 });
    resolve2({ status: 200 });

    vi.waitFor(() => {
      expect(callback).toHaveBeenLastCalledWith(false);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  it("allows unsubscribing", async () => {
    const callback = vi.fn();
    mod.subscribeToApiActivity(callback);
    mod.unsubscribeFromApiActivity(callback);

    http.get(`${API1_BASE}/test`, () => {
      return HttpResponse.json({});
    });

    await fetch1("/test");

    expect(callback).not.toBeCalledWith(true);
  });

  it("publishes immediately on subscribe when requests are active", async () => {
    const callback = vi.fn();

    http.get(`${API1_BASE}/test`, () => {
      return HttpResponse.json({});
    });

    fetch1("/test");

    mod.subscribeToApiActivity(callback);

    vi.waitFor(() => {
      expect(callback).toHaveBeenCalled();
    });
  });
});
