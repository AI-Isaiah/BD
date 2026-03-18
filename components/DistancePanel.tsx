"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";
import { AlertTriangle, TrendingUp } from "lucide-react";
import ChartTooltip from "@/components/ChartTooltip";
import type { DistanceExplorerData } from "@/lib/types";

interface Props {
  data: DistanceExplorerData;
}

export default function DistancePanel({ data }: Props) {
  const currentBucket = data.buckets[data.currentBucketIdx];

  return (
    <div className="space-y-6">
      {/* Hold Rate + Continued Further Chart */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">
            Distance Distribution
          </h3>
          <span className="text-xs text-[#888888] ml-auto">
            {data.totalSamples} sessions · Current move: {data.currentMovePct.toFixed(2)}%
          </span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.buckets} barGap={1}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#888888", fontSize: 10 }}
              stroke="#1F1F1F"
            />
            <YAxis
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#888888", fontSize: 12 }} />
            <ReferenceLine
              x={currentBucket?.label}
              stroke="#FFFFFF"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: "NOW", fill: "#FFFFFF", fontSize: 10, position: "top" }}
            />
            <Bar dataKey="highHoldPct" name="High Hold %" radius={[3, 3, 0, 0]}>
              {data.buckets.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === data.currentBucketIdx ? "#FFFFFF" : "#22c55e"}
                />
              ))}
            </Bar>
            <Bar dataKey="lowHoldPct" name="Low Hold %" radius={[3, 3, 0, 0]}>
              {data.buckets.map((_, i) => (
                <Cell
                  key={i}
                  fill={i === data.currentBucketIdx ? "#FFFFFF" : "#ef4444"}
                />
              ))}
            </Bar>
            <Bar
              dataKey="continuedFurtherPct"
              name="Continued Further %"
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reversal + Flip Risk Chart */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          Reversal Risk by Distance
        </h3>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.buckets} barGap={1}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#888888", fontSize: 10 }}
              stroke="#1F1F1F"
            />
            <YAxis
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#888888", fontSize: 12 }} />
            <Bar
              dataKey="reversalAfterPct"
              name="Reversal After %"
              fill="#F5A623"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="p1FlipRisk"
              name="P1 Flip Risk %"
              fill="#FF4976"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Current Distance Warning Banner */}
      {currentBucket && (
        <div
          className={`p-5 rounded-2xl flex gap-4 border ${
            currentBucket.smallWickWarning
              ? "bg-red-950/50 border-red-500/30"
              : "bg-[#111111] border-[#1F1F1F]"
          }`}
        >
          <AlertTriangle
            className={`w-6 h-6 shrink-0 ${
              currentBucket.smallWickWarning ? "text-red-400" : "text-yellow-400"
            }`}
          />
          <div>
            <p className="text-base font-semibold text-white">
              Current Move: {data.currentMovePct.toFixed(2)}% (bucket {currentBucket.label})
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Hold Rate: {currentBucket.highHoldPct}% ·
              Continued Further: {currentBucket.continuedFurtherPct}% ·
              Reversal: {currentBucket.reversalAfterPct}% ·
              P1 Flip Risk: {currentBucket.p1FlipRisk}%
            </p>
            {currentBucket.smallWickWarning && (
              <p className="text-sm font-bold text-red-400 mt-1">
                SMALL WICK — STATISTICALLY MORE LIKELY TO BE TAKEN OUT
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
