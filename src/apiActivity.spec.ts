import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  subscribeToApiActivity,
  unsubscribeFromApiActivity,
} from "./apiActivity";
import fetch1 from "./fetch1";
import fetch2 from "./fetch2";

describe("apiActivity", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("notifies when requests start and end", async () => {
    const callback = vi.fn();
    subscribeToApiActivity(callback);

    let resolve1: any;
    const promise1 = new Promise<any>((resolve) => {
      resolve1 = resolve;
    });

    let resolve2: any;
    const promise2 = new Promise<any>((resolve) => {
      resolve2 = resolve;
    });

    fetchMock.mockResponseOnce(() => promise1);
    fetchMock.mockResponseOnce(() => promise2);

    // Start first request
    fetch1("/test");

    expect(callback).toHaveBeenLastCalledWith(true);

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
    subscribeToApiActivity(callback);
    unsubscribeFromApiActivity(callback);

    fetchMock.mockResponse("{}");
    await fetch1("/test");

    expect(callback).not.toHaveBeenCalled();
  });
});