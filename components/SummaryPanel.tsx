"use client";

import { Target, TrendingUp, Shield, FileDown } from "lucide-react";
import { exportTradingPlan } from "@/lib/export-pdf";
import type { SummaryData, SummaryPageData } from "@/lib/types";

interface Props {
  data: SummaryPageData;
}

function BiasCard({ summary, label }: { summary: SummaryData; label: string }) {
  const biasColor =
    summary.biasDirection === "bullish"
      ? "text-emerald-400"
      : summary.biasDirection === "bearish"
        ? "text-red-400"
        : "text-yellow-400";

  const biasBg =
    summary.biasDirection === "bullish"
      ? "bg-emerald-950/30 border-emerald-500/20"
      : summary.biasDirection === "bearish"
        ? "bg-red-950/30 border-red-500/20"
        : "bg-yellow-950/30 border-yellow-500/20";

  const strengthColor =
    summary.pivotStrength === "strong" ? "text-emerald-400" : "text-orange-400";

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-white border-b border-[#1F1F1F] pb-3">
        {label}
      </h3>

      {/* Bias */}
      <div className={`rounded-2xl p-6 border ${biasBg}`}>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Overall Bias
        </p>
        <p className={`text-5xl font-bold ${biasColor}`}>
          {summary.biasDirection.toUpperCase()}
        </p>
        <p className="text-lg text-gray-400 mt-1">
          {summary.biasConfidence}% confidence
        </p>
      </div>

      {/* Confidence Targets */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-blue-400" />
          <p className="text-sm font-medium text-gray-400">Confidence Targets</p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">90%</span>
            <span className="text-lg font-mono text-emerald-400">
              {summary.confidenceTargets.ninety.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">50%</span>
            <span className="text-lg font-mono text-blue-400">
              {summary.confidenceTargets.fifty.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">20%</span>
            <span className="text-lg font-mono text-yellow-400">
              {summary.confidenceTargets.twenty.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Pivot Strength */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-purple-400" />
          <p className="text-sm font-medium text-gray-400">Pivot Strength</p>
        </div>
        <p className={`text-3xl font-bold ${strengthColor}`}>
          {summary.pivotStrength.toUpperCase()}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {summary.pivotHoldPct}% historical hold probability
        </p>
        <div className="mt-3 pt-3 border-t border-[#1F1F1F]">
          <p className="text-xs text-gray-500">
            P1 Flip Risk:{" "}
            <span
              className={
                summary.overallP1FlipRisk < 35
                  ? "text-emerald-400"
                  : summary.overallP1FlipRisk > 55
                    ? "text-red-400"
                    : "text-yellow-400"
              }
            >
              {summary.overallP1FlipRisk}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SummaryPanel({ data }: Props) {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">
          Summary & Bias
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BiasCard summary={data.daily} label="Daily" />
        <BiasCard summary={data.weekly} label="Weekly" />
      </div>

      <div className="mt-6 pt-6 border-t border-[#1F1F1F] flex gap-3">
        <button
          onClick={() => exportTradingPlan(data.daily, "BTCUSDT")}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export Daily PDF
        </button>
        <button
          onClick={() => exportTradingPlan(data.weekly, "BTCUSDT")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export Weekly PDF
        </button>
      </div>
    </div>
  );
}
