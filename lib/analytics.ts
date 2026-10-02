export type EventProps = Record<string, string | number | boolean | undefined>;

export type AnalyticsEvent = {
  name: string;
  props?: EventProps;
  ts: number;
  sessionId: string;
};

const ENDPOINT = "/api/events";
const LOG_KEY = "event-log";
const LOG_LIMIT = 50;

/** Fired on window after every tracked event, so the page can show it live. */
export const EVENT_LOG_UPDATED = "analytics:event";

export function getSessionId(): string {
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

/** The events sent this session, newest last. Lets the visitor see exactly what was sent. */
export function getEventLog(): AnalyticsEvent[] {
  try {
    return JSON.parse(sessionStorage.getItem(LOG_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function appendToLog(event: AnalyticsEvent): void {
  try {
    const log = [...getEventLog(), event].slice(-LOG_LIMIT);
    sessionStorage.setItem(LOG_KEY, JSON.stringify(log));
  } catch {
    // Storage blocked: the widget just won't show history.
  }
  window.dispatchEvent(new CustomEvent(EVENT_LOG_UPDATED, { detail: event }));
}

/** Fire-and-forget event. Uses sendBeacon so events survive page unloads. */
export function track(name: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const event: AnalyticsEvent = { name, props, ts: Date.now(), sessionId: getSessionId() };
  const body = JSON.stringify(event);
  appendToLog(event);

  if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))) return;
  void fetch(ENDPOINT, {
    method: "POST",
    body,
    keepalive: true,
    headers: { "content-type": "application/json" },
  }).catch(() => {});
}
