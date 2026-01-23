/**
 * TypeScript declarations for analytics libraries
 */

interface Window {
  gtag?: (
    command: "config" | "event" | "js" | "set",
    targetId: string | Date,
    config?: Record<string, unknown>
  ) => void;
  dataLayer?: unknown[];
  umami?: {
    track: (eventName: string, eventData?: Record<string, unknown>) => void;
  };
}
