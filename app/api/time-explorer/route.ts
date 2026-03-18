import { NextRequest, NextResponse } from "next/server";
import type { Timeframe, TimeStatBucket, TimeExplorerData } from "@/lib/types";

function generateMockTimeStats(): TimeStatBucket[] {
  const buckets: TimeStatBucket[] = [];

  for (let hour = 0; hour < 24; hour++) {
    // Bimodal distribution: London open (8-9) + NY open (13-14)
    const londonPeak = Math.exp(-0.5 * Math.pow((hour - 8.5) / 2, 2));
    const nyPeak = Math.exp(-0.5 * Math.pow((hour - 13.5) / 2, 2));
    const base = 0.08;

    // Highs peak slightly earlier in sessions
    const highFactor = base + londonPeak * 0.55 + nyPeak * 0.45;
    // Lows peak slightly later
    const lowFactor = base + Math.exp(-0.5 * Math.pow((hour - 9.5) / 2, 2)) * 0.45 + Math.exp(-0.5 * Math.pow((hour - 14.5) / 2, 2)) * 0.55;

    const highFormPct = +(highFactor * 100).toFixed(1);
    const lowFormPct = +(lowFactor * 100).toFixed(1);

    // Hold rates: higher during active hours, lower at extremes
    const sessionActivity = londonPeak + nyPeak;
    const highHoldPct = +(35 + sessionActivity * 30 + Math.sin(hour * 0.7) * 5).toFixed(1);
    const lowHoldPct = +(38 + sessionActivity * 28 + Math.sin(hour * 0.9) * 4).toFixed(1);

    buckets.push({
      bucket: String(hour).padStart(2, "0"),
      highFormationPct: highFormPct,
      lowFormationPct: lowFormPct,
      highHoldPct: Math.min(85, Math.max(20, highHoldPct)),
      lowHoldPct: Math.min(85, Math.max(20, lowHoldPct)),
      takenOutAfterHighPct: +(100 - Math.min(85, Math.max(20, highHoldPct))).toFixed(1),
      takenOutAfterLowPct: +(100 - Math.min(85, Math.max(20, lowHoldPct))).toFixed(1),
      earlyWarning: hour < 6 || hour > 20,
    });
  }

  return buckets;
}

export async function GET(request: NextRequest) {
  const tf = (request.nextUrl.searchParams.get("tf") ?? "daily") as Timeframe;
  const buckets = generateMockTimeStats();

  // Simulate current P1 bucket based on time of day
  const currentHour = new Date().getUTCHours();
  const currentP1Bucket = String(currentHour).padStart(2, "0");

  const data: TimeExplorerData = {
    timeframe: tf,
    buckets,
    currentP1Bucket,
    totalSamples: 730,
  };

  return NextResponse.json(data);
}
