import { AlertTriangle } from "lucide-react";
import { getRiskColor } from "@/lib/colors";
import type { DashboardData } from "@/lib/types";

interface Props {
  data: DashboardData;
}

export default function KeyInsights({ data }: Props) {
  const riskColor = getRiskColor(data.p1FlipRisk);

  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 h-fit">
      <h2 className="text-lg font-semibold mb-6 text-white">KEY INSIGHTS</h2>

      <div className="space-y-8">
        {/* P1 FLIP RISK */}
        <div>
          <p className="text-xs text-gray-400 mb-1">
            P1 FLIP RISK ({data.currentP1.type === "high" ? "HIGH" : "LOW"})
          </p>
          <p className={`text-6xl font-bold ${riskColor}`}>
            {data.p1FlipRisk}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Formed at {data.currentP1.timeLabel}
          </p>
        </div>

        {/* % NEW P2 */}
        <div>
          <p className="text-xs text-gray-400 mb-1">% NEW P2</p>
          <p className="text-5xl font-bold text-emerald-400">
            {data.newP2Confidence}%
          </p>
          <p className="text-xs text-gray-500">chance new P2 still to form</p>
        </div>

        {/* SMALL WICK WARNING */}
        {data.smallWickWarning && (
          <div className="flex items-center gap-3 bg-red-950/50 border border-red-500/30 rounded-xl p-4">
            <AlertTriangle className="text-red-400 w-5 h-5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-400">
                SMALL WICK WARNING
              </p>
              <p className="text-xs text-red-400/80">
                Statistically low hold probability
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
