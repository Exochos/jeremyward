"use client";

import { useEffect, useState } from "react";
import { EVENT_LOG_UPDATED, getEventLog, getSessionId, type AnalyticsEvent } from "@/lib/analytics";
import { Tag } from "./Tag";

type ServerView = {
  ip?: string;
  headers: Record<string, string>;
  geo: { country?: string; region?: string; city?: string };
};

type Row = [label: string, value: string | number | boolean | undefined];

function browserRows(): Row[] {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string };
  };
  return [
    ["session id", getSessionId()],
    ["timezone", Intl.DateTimeFormat().resolvedOptions().timeZone],
    ["languages", navigator.languages.join(", ")],
    ["screen", `${screen.width}x${screen.height} @${window.devicePixelRatio}x`],
    ["viewport", `${window.innerWidth}x${window.innerHeight}`],
    ["cpu cores", navigator.hardwareConcurrency],
    ["memory (GB, approx)", nav.deviceMemory],
    ["connection", nav.connection?.effectiveType],
    ["touch points", navigator.maxTouchPoints],
    ["cookies enabled", navigator.cookieEnabled],
    ["referrer", document.referrer || undefined],
  ];
}

function Table({ rows }: { rows: Row[] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs">
      {rows
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="break-all text-foreground">{String(value)}</dd>
          </div>
        ))}
    </dl>
  );
}

/** Shows visitors what the site collects about them, as it is collected. */
export function WhoAmI() {
  const [server, setServer] = useState<ServerView | null>(null);
  const [browser, setBrowser] = useState<Row[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    setBrowser(browserRows());
    setEvents(getEventLog());
    fetch("/api/whoami")
      .then((res) => res.json())
      .then(setServer)
      .catch(() => {});

    const onEvent = () => setEvents(getEventLog());
    window.addEventListener(EVENT_LOG_UPDATED, onEvent);
    return () => window.removeEventListener(EVENT_LOG_UPDATED, onEvent);
  }, []);

  const serverRows: Row[] = server
    ? [
        ["ip", server.ip],
        ["country", server.geo.country],
        ["region", server.geo.region],
        ["city", server.geo.city],
        ...Object.entries(server.headers),
      ]
    : [["status", "loading…"]];

  return (
    <Tag as="section" id="whoami" data-section="whoami" className="scroll-mt-28 bg-card p-8 pt-4">
      <h2 className="mb-2 font-mono text-sm uppercase tracking-widest text-primary">What this site knows about you</h2>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Everything below is visible to the server or the analytics on this page. Nothing here is sold or shared.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Tag label="server sees" corner="top-right" className="p-6 pt-4">
          <Table rows={serverRows} />
        </Tag>
        <Tag label="browser says" corner="top-right" className="p-6 pt-4">
          <Table rows={browser} />
        </Tag>
      </div>
      <Tag label="events sent" corner="top-right" className="mt-6 p-6 pt-4">
        <ol className="max-h-64 space-y-1 overflow-y-auto font-mono text-xs">
          {events.length === 0 && <li className="text-muted-foreground">none yet</li>}
          {[...events].reverse().map((event, i) => (
            <li key={events.length - i} className="break-all">
              <span className="text-muted-foreground">{new Date(event.ts).toLocaleTimeString()}</span>{" "}
              <span className="text-highlight">{event.name}</span>{" "}
              <span className="text-muted-foreground">{JSON.stringify(event.props)}</span>
            </li>
          ))}
        </ol>
      </Tag>
    </Tag>
  );
}
