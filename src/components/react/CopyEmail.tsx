import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { confetti } from "../../scripts/confetti";

interface Props {
  email: string;
  copyLabel: string;
  cursorLabel: string;
  toastLabel: string;
}

const TOAST_MS = 2400;

/** Copies the email to the clipboard, throws confetti and shows a toast. */
export default function CopyEmail({ email, copyLabel, cursorLabel, toastLabel }: Props) {
  const [toastVisible, setToastVisible] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  // The toast is position: fixed, so it is rendered in <body> to escape any transformed ancestor.
  useEffect(() => {
    setPortalTarget(document.body);
    return () => window.clearTimeout(timer.current);
  }, []);

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    // Read the position before awaiting: React clears currentTarget once the handler yields.
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }

    confetti(x, y);
    setToastVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastVisible(false), TOAST_MS);
  }

  return (
    <>
      <button type="button" className="email-btn" data-magnetic data-cursor={cursorLabel} onClick={handleClick}>
        <span>{email}</span>
        <small>{copyLabel}</small>
      </button>
      {portalTarget &&
        createPortal(
          <div className={`toast${toastVisible ? " show" : ""}`} role="status" aria-live="polite">
            {toastLabel}
          </div>,
          portalTarget,
        )}
    </>
  );
}
