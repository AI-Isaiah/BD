"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import KeyInsights from "@/components/KeyInsights";
import MainChart from "@/components/MainChart";
import NavBar from "@/components/NavBar";
import WarningBanner from "@/components/WarningBanner";
import type { DashboardData, Timeframe } from "@/lib/types";

function DashboardContent() {
  const searchParams = useSearchParams();
  const tf = (searchParams.get("tf") ?? "daily") as Timeframe;
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard?tf=${tf}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Failed to load dashboard:", err));
  }, [tf]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      <NavBar />
      {data && <WarningBanner data={data} />}
      {!data ? (
        <div className="flex items-center justify-center h-[80vh]">
          Loading Brighter Data...
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 md:p-8">
            <div className="bg-[#111111] h-[400px] md:h-[600px] rounded-3xl border border-[#1F1F1F]">
              <MainChart data={data} />
            </div>
          </div>
          <div className="w-full lg:w-96 lg:border-l border-t lg:border-t-0 border-[#1F1F1F] p-4 md:p-8">
            <KeyInsights data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#0A0A0A] text-white">
          Loading Brighter Data...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
