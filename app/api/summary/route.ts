import { NextRequest, NextResponse } from "next/server";
import type { SummaryData, SummaryPageData } from "@/lib/types";

function generateMockSummary(tf: "daily" | "weekly"): SummaryData {
  // Simulate bias from time hold + distance reversal
  const timeHold = tf === "daily" ? 0.62 : 0.71;
  const distanceReversal = tf === "daily" ? 0.38 : 0.29;
  const biasScore = timeHold * 0.55 + (1 - distanceReversal) * 0.45;

  const biasDirection =
    biasScore > 0.65 ? "bullish" : biasScore < 0.35 ? "bearish" : "neutral";
  const biasConfidence = Math.round(biasScore * 100);

  // Mock price-based confidence targets
  const basePrice = tf === "daily" ? 51500 : 50800;
  const range = tf === "daily" ? 1800 : 3200;

  return {
    timeframe: tf,
    biasDirection: biasDirection as SummaryData["biasDirection"],
    biasConfidence,
    overallP1FlipRisk: tf === "daily" ? 34.2 : 28.5,
    confidenceTargets: {
      ninety: Math.round(basePrice + range * 1.618),
      fifty: Math.round(basePrice + range * 1.0),
      twenty: Math.round(basePrice + range * 0.618),
    },
    pivotStrength: biasConfidence > 60 ? "strong" : "weak",
    pivotHoldPct: Math.round(biasScore * 78 + 22),
  };
}

export async function GET(request: NextRequest) {
  const data: SummaryPageData = {
    daily: generateMockSummary("daily"),
    weekly: generateMockSummary("weekly"),
  };

  return NextResponse.json(data);
}
