export type EventProps = Record<string, string | number | boolean | undefined>;

export type AnalyticsEvent = {
  name: string;
  props?: EventProps;
  ts: number;
  sessionId: string;
};

const ENDPOINT = "/api/events";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("sid", id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

/** Fire-and-forget event. Uses sendBeacon so events survive page unloads. */
export function track(name: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const event: AnalyticsEvent = { name, props, ts: Date.now(), sessionId: getSessionId() };
  const body = JSON.stringify(event);

  if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return;
  void fetch(ENDPOINT, {
    method: "POST",
    body,
    keepalive: true,
    headers: { "content-type": "application/json" },
  }).catch(() => {});
}
