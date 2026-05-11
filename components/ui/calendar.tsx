"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

import "react-day-picker/style.css";

function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn("p-3 text-foreground dark:bg-[#0a0a0a]", className)}
      {...props}
    />
  );
}

export { Calendar };
