"use client";

import { AlertTriangle } from "lucide-react";
import type { DashboardData } from "@/lib/types";

interface Props {
  data: DashboardData;
}

export default function WarningBanner({ data }: Props) {
  const warnings: string[] = [];

  if (data.p1FlipRisk > 55) {
    warnings.push(`P1 FLIP RISK HIGH — ${data.p1FlipRisk}% probability of being taken out`);
  }
  if (data.smallWickWarning) {
    warnings.push("SMALL WICK DETECTED — Statistically more likely to be taken out");
  }

  if (warnings.length === 0) return null;

  return (
    <div className="bg-red-950/80 border-b border-red-500/40 py-3 px-6 flex items-center gap-3">
      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-sm font-medium text-red-400">{warnings[0]}</p>
      {warnings.length > 1 && (
        <span className="text-xs text-red-400/60 ml-auto">
          +{warnings.length - 1} more
        </span>
      )}
    </div>
  );
}
