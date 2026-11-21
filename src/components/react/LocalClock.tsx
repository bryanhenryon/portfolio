import { useEffect, useMemo, useState } from "react";

interface Props {
  locale: string;
  /** IANA time zone shown by the clock */
  timeZone?: string;
}

/** Live local time, refreshed every 15 s. Renders a placeholder on the server. */
export default function LocalClock({ locale, timeZone = "Europe/Paris" }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  const format = useMemo(
    () => new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone, timeZoneName: "short" }),
    [locale, timeZone],
  );

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{now ? format.format(now) : "--:--"}</span>;
}
