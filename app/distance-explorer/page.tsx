"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import DistancePanel from "@/components/DistancePanel";
import type { Timeframe, DistanceExplorerData } from "@/lib/types";

function DistanceExplorerContent() {
  const searchParams = useSearchParams();
  const tf = (searchParams.get("tf") ?? "daily") as Timeframe;
  const [data, setData] = useState<DistanceExplorerData | null>(null);

  useEffect(() => {
    fetch(`/api/distance-explorer?tf=${tf}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load distance stats:", err));
  }, [tf]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <NavBar />
      {!data ? (
        <div className="flex items-center justify-center h-[80vh]">
          Loading Distance Explorer...
        </div>
      ) : (
        <div className="p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Distance Statistics & Warnings</h1>
          <p className="text-[#888888] mb-8">
            How far has price moved? How often did similar moves hold?
            Based on {data.totalSamples} historical sessions.
          </p>
          <DistancePanel data={data} />
        </div>
      )}
    </div>
  );
}

export default function DistanceExplorerPage() {
  return (
    <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
      <DistanceExplorerContent />
    </Suspense>
  );
}
