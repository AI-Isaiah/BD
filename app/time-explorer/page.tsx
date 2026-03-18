"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import TimePanel from "@/components/TimePanel";
import type { Timeframe, TimeExplorerData } from "@/lib/types";

function TimeExplorerContent() {
  const searchParams = useSearchParams();
  const tf = (searchParams.get("tf") ?? "daily") as Timeframe;
  const [data, setData] = useState<TimeExplorerData | null>(null);

  useEffect(() => {
    fetch(`/api/time-explorer?tf=${tf}`)
      .then((res) => res.json())
      .then(setData);
  }, [tf]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <NavBar />
      {!data ? (
        <div className="flex items-center justify-center h-[80vh]">
          Loading Time Explorer...
        </div>
      ) : (
        <div className="p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Time Data Explorer</h1>
          <p className="text-[#888888] mb-8">
            When do highs and lows typically form? How often do they hold at
            similar times? Based on {data.totalSamples} historical sessions.
          </p>
          <TimePanel data={data} />
        </div>
      )}
    </div>
  );
}

export default function TimeExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0A0A0A] min-h-screen" />
      }
    >
      <TimeExplorerContent />
    </Suspense>
  );
}
