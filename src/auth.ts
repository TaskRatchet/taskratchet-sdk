type AuthTokenGetter = () => string | null | Promise<string | null>;

let getter: AuthTokenGetter = () => null;

export function setAuthTokenGetter(fn: AuthTokenGetter): void {
  getter = fn;
}

export async function getAuthToken(): Promise<string | null> {
  return getter();
}
