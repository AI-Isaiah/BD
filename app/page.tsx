"use client";

import KeyInsights from "@/components/KeyInsights";
import MainChart from "@/components/MainChart";
import { useEffect, useState } from "react";
import type { DashboardData } from "@/lib/types";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A0A0A] text-white">
        Loading Brighter Data...
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen">
      {/* Top Nav */}
      <nav className="border-b border-[#1F1F1F] p-4 flex items-center justify-between">
        <div className="font-bold text-xl">Brighter Data</div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="BTCUSDT"
            className="bg-[#111] px-4 py-2 rounded-lg border border-[#1F1F1F] text-white"
          />
          <button className="bg-emerald-500 px-6 py-2 rounded-lg font-medium text-white">
            Daily
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Main Chart Area */}
        <div className="flex-1 p-8">
          <div className="bg-[#111111] h-[600px] rounded-3xl border border-[#1F1F1F]">
            <MainChart data={data} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 border-l border-[#1F1F1F] p-8">
          <KeyInsights data={data} />
        </div>
      </div>
    </div>
  );
}
