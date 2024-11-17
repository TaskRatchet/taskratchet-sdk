let activeRequests = 0;
let activitySubs: Array<(isActive: boolean) => void> = [];

export function subscribeToApiActivity(
  callback: (isActive: boolean) => void
): void {
  activitySubs.push(callback);
}

export function unsubscribeFromApiActivity(
  callback: (isActive: boolean) => void
): void {
  activitySubs = activitySubs.filter((x) => x !== callback);
}

function publishActivityState(): void {
  const isActive = activeRequests > 0;
  activitySubs.forEach((callback) => callback(isActive));
}

export function trackRequest(): () => void {
  activeRequests++;
  if (activeRequests === 1) {
    publishActivityState();
  }

  return () => {
    activeRequests--;
    if (activeRequests === 0) {
      publishActivityState();
    }
  };
}
