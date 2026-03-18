"use client";

import { Suspense, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import SummaryPanel from "@/components/SummaryPanel";
import type { SummaryPageData } from "@/lib/types";

function SummaryContent() {
  const [data, setData] = useState<SummaryPageData | null>(null);

  useEffect(() => {
    fetch("/api/summary")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <NavBar />
      {!data ? (
        <div className="flex items-center justify-center h-[80vh]">
          Loading Summary...
        </div>
      ) : (
        <div className="p-8 max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Summary & Bias</h1>
          <p className="text-[#888888] mb-8">
            Combined Time + Distance insights across Daily and Weekly
            timeframes. Overall direction, confidence targets, and pivot
            strength at a glance.
          </p>
          <SummaryPanel data={data} />
        </div>
      )}
    </div>
  );
}

export default function SummaryPage() {
  return (
    <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
      <SummaryContent />
    </Suspense>
  );
}
