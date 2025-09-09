type AuthTokenGetter = () => string | null | Promise<string | null>;

let getter: AuthTokenGetter = () => null;

/**
 * Registers a function used to retrieve the authentication token.
 *
 * Replaces the current token getter with `fn`. The provided function will be invoked
 * by `getAuthToken()` to obtain the current token; it may return a `string`, `null`,
 * or a `Promise` that resolves to `string | null`.
 *
 * @param fn - A function that returns the auth token (or `null`) synchronously or via a `Promise`.
 */
export function setAuthTokenGetter(fn: AuthTokenGetter): void {
  getter = fn;
}

/**
 * Retrieves the current authentication token by invoking the registered token getter.
 *
 * The registered getter may return a string, `null`, or a `Promise` resolving to string or `null`;
 * this function always returns a `Promise` that resolves to that value. If no custom getter has
 * been registered, the default getter returns `null`. Any errors thrown by the getter are
 * propagated as a rejected promise.
 *
 * @returns A promise that resolves to the auth token string or `null`.
 */
export async function getAuthToken(): Promise<string | null> {
  return getter();
}
