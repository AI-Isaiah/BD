import { NextRequest, NextResponse } from "next/server";
import type { Timeframe, DistanceStatBucket, DistanceExplorerData } from "@/lib/types";

function generateMockDistanceStats(): DistanceStatBucket[] {
  const buckets: DistanceStatBucket[] = [];

  // 0.5% increments from 0 to 5%
  for (let i = 0; i <= 10; i++) {
    const movePct = i * 0.5;
    const nextPct = movePct + 0.5;

    // Right-skewed: hold rates decrease as move increases
    const holdDecay = Math.exp(-0.3 * i);
    const highHoldPct = +(72 * holdDecay + 8 + Math.sin(i * 1.3) * 3).toFixed(1);
    const lowHoldPct = +(68 * holdDecay + 10 + Math.sin(i * 1.7) * 4).toFixed(1);

    // Continued further increases with move size
    const continuedFurtherPct = +(15 + i * 6.5 + Math.sin(i * 0.9) * 3).toFixed(1);

    // Reversal = inverse of hold
    const reversalAfterPct = +(100 - Math.max(20, highHoldPct)).toFixed(1);

    // Small wick warning for tiny moves (< 0.5%)
    const smallWickWarning = movePct < 0.5;

    // P1 flip risk higher for smaller moves (price hasn't extended enough)
    const p1FlipRisk = +(55 * holdDecay + 15 + Math.sin(i * 2.1) * 4).toFixed(1);

    buckets.push({
      movePctBucket: movePct,
      label: `${movePct.toFixed(1)}-${nextPct.toFixed(1)}%`,
      highHoldPct: Math.min(85, Math.max(15, highHoldPct)),
      lowHoldPct: Math.min(85, Math.max(15, lowHoldPct)),
      continuedFurtherPct: Math.min(90, Math.max(10, continuedFurtherPct)),
      reversalAfterPct: Math.min(80, Math.max(15, reversalAfterPct)),
      smallWickWarning,
      p1FlipRisk: Math.min(75, Math.max(20, p1FlipRisk)),
    });
  }

  return buckets;
}

const cachedBuckets = generateMockDistanceStats();

export async function GET(request: NextRequest) {
  const tf = (request.nextUrl.searchParams.get("tf") ?? "daily") as Timeframe;
  const buckets = cachedBuckets;

  // Simulate current move from mock candle data
  const currentMovePct = 1.45;
  const currentBucketIdx = buckets.findIndex(
    (b) => Math.abs(b.movePctBucket - Math.floor(currentMovePct * 2) / 2) < 0.01
  );

  const data: DistanceExplorerData = {
    timeframe: tf,
    buckets,
    currentMovePct,
    currentBucketIdx: currentBucketIdx >= 0 ? currentBucketIdx : 2,
    totalSamples: 730,
  };

  return NextResponse.json(data);
}
