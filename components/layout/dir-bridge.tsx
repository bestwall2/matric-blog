"use client";

import { useEffect } from "react";

export function DirBridge({ dir }: { dir: "rtl" | "ltr" }) {
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = dir === "rtl" ? "ar" : "en";
  }, [dir]);
  return null;
}
