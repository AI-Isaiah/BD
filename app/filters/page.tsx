"use client";

import { Suspense } from "react";
import NavBar from "@/components/NavBar";
import FiltersPanel from "@/components/FiltersPanel";

export default function FiltersPage() {
  return (
    <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
      <div className="bg-[#0A0A0A] text-white min-h-screen">
        <NavBar />
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Filters & Recommended Settings</h1>
          <p className="text-[#888888] mb-8">
            Adjust thresholds for hold rate, flip risk, and wick warnings. Settings
            are saved to your browser automatically.
          </p>
          <FiltersPanel />
        </div>
      </div>
    </Suspense>
  );
}
