"use client";
// Custom type for Scheduler API
interface Scheduler {
  postTask: (
    callback: () => void,
    options?: { priority?: string; signal?: AbortSignal }
  ) => void;
}

interface WindowWithScheduler extends Window {
  scheduler?: Scheduler;
}

import { useEffect } from "react";

export default function useBackgroundTask() {
  useEffect(() => {
    let controller: AbortController | undefined;
    if ("scheduler" in window) {
      controller = new AbortController();
      (window as WindowWithScheduler).scheduler?.postTask(
        () => {
          // Stylish log with icon and color
          console.log(
            "%c🛠️ [BackgroundTask] Checking zone updates...",
            "background: linear-gradient(90deg, #fbbf24 0%, #f87171 100%); color: #fff; font-weight: bold; padding: 2px 8px; border-radius: 6px;"
          );
        },
        {
          priority: "background",
          signal: controller.signal,
        }
      );
    } else {
      // Stylish fallback log
      console.log(
        "%c⚠️ [Fallback] Background Task API not supported",
        "background: #f87171; color: #fff; font-weight: bold; padding: 2px 8px; border-radius: 6px;"
      );
    }
    return () => {
      if (controller) controller.abort();
    };
  }, []);
}
