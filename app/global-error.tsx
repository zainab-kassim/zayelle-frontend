"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            width: "100%",
            minHeight: "100vh",
            background: "#FCFBF9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
              maxWidth: "420px",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                color: "#17171A",
                fontSize: "40px",
                margin: 0,
              }}
            >
              Uh Oh
            </p>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#726B60",
                fontSize: "13px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Something went wrong loading Zayelle. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "11px",
                color: "#FCFBF9",
                background: "#17171A",
                borderRadius: "999px",
                border: "none",
                height: "48px",
                padding: "0 32px",
                marginTop: "8px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
