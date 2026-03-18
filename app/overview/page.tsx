"use client";

import { Suspense, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import OverviewTable from "@/components/OverviewTable";

function OverviewContent() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <NavBar />
      {!data ? (
        <div className="flex items-center justify-center h-[80vh]">
          Loading Overview...
        </div>
      ) : (
        <div className="p-8 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Multi-Asset Overview</h1>
          <p className="text-[#888888] mb-8">
            Quick comparison of bias, hold rates, and flip risk across crypto
            assets.
          </p>
          <OverviewTable data={data} />
        </div>
      )}
    </div>
  );
}

export default function OverviewPage() {
  return (
    <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
      <OverviewContent />
    </Suspense>
  );
}
