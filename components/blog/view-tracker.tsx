"use client";

import { useEffect } from "react";

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await fetch("/api/posts/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
      } catch {
        if (!cancelled) {
          /* ignore */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return null;
}
