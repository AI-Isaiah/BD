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
} from "recharts";
import { AlertTriangle, Clock } from "lucide-react";
import ChartTooltip from "@/components/ChartTooltip";
import type { TimeExplorerData } from "@/lib/types";

interface Props {
  data: TimeExplorerData;
}

export default function TimePanel({ data }: Props) {
  const currentStat = data.buckets.find((b) => b.bucket === data.currentP1Bucket);

  return (
    <div className="space-y-6">
      {/* Formation Chart */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">
            Formation Distribution
          </h3>
          <span className="text-xs text-[#888888] ml-auto">
            {data.totalSamples} sessions analyzed
          </span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.buckets} barGap={1}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis
              dataKey="bucket"
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}h`}
            />
            <YAxis
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{ color: "#888888", fontSize: 12 }}
            />
            <Bar
              dataKey="highFormationPct"
              name="High Formation %"
              radius={[3, 3, 0, 0]}
            >
              {data.buckets.map((entry) => (
                <Cell
                  key={entry.bucket}
                  fill={
                    entry.bucket === data.currentP1Bucket
                      ? "#FFFFFF"
                      : "#22c55e"
                  }
                />
              ))}
            </Bar>
            <Bar
              dataKey="lowFormationPct"
              name="Low Formation %"
              radius={[3, 3, 0, 0]}
            >
              {data.buckets.map((entry) => (
                <Cell
                  key={entry.bucket}
                  fill={
                    entry.bucket === data.currentP1Bucket
                      ? "#FFFFFF"
                      : "#ef4444"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Hold Rate Chart */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">
          Hold Rate by Hour
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.buckets} barGap={1}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
            <XAxis
              dataKey="bucket"
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}h`}
            />
            <YAxis
              tick={{ fill: "#888888", fontSize: 11 }}
              stroke="#1F1F1F"
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ color: "#888888", fontSize: 12 }} />
            <Bar
              dataKey="highHoldPct"
              name="High Hold %"
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="lowHoldPct"
              name="Low Hold %"
              fill="#8b5cf6"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Current P1 Warning Banner */}
      {currentStat && (
        <div
          className={`p-5 rounded-2xl flex gap-4 border ${
            currentStat.earlyWarning
              ? "bg-red-950/50 border-red-500/30"
              : "bg-yellow-950/30 border-yellow-500/30"
          }`}
        >
          <AlertTriangle
            className={`w-6 h-6 shrink-0 ${
              currentStat.earlyWarning ? "text-red-400" : "text-yellow-400"
            }`}
          />
          <div>
            <p className="text-base font-semibold text-white">
              Current P1 formed at {data.currentP1Bucket}:00 UTC
            </p>
            <p className="text-sm text-gray-400 mt-1">
              High Formation: {currentStat.highFormationPct}% ·
              Hold Rate: {currentStat.highHoldPct}% ·
              Taken Out After: {currentStat.takenOutAfterHighPct}%
            </p>
            {currentStat.earlyWarning && (
              <p className="text-sm font-bold text-red-400 mt-1">
                UNUSUALLY EARLY — HIGHER FLIP RISK
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
