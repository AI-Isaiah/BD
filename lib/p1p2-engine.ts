import type { CandleData, PivotPoint } from "./types";

export interface P1P2Result {
  p1: PivotPoint;
  p2: PivotPoint | null;
  confidenceTargets: { ninety: number; fifty: number; twenty: number };
}

/**
 * Detect P1 and P2 from candle data.
 *
 * Official definition (brighterdata.com + TradingView indicator):
 * "P1 is either the highest or lowest point of the timeframe, whichever came first.
 *  P2 is whichever came second."
 *
 * Algorithm:
 * 1. Scan candles chronologically, tracking when each new high/low was set
 * 2. The session high = candle with max high, session low = candle with min low
 * 3. P1 = whichever extreme was established first chronologically
 * 4. P2 = the other extreme (or null if not yet formed in a live session)
 */
export function detectP1P2(candles: CandleData[]): P1P2Result {
  if (candles.length < 1) {
    throw new Error("Need at least 1 candle");
  }

  const sorted = [...candles].sort((a, b) => a.time - b.time);

  // Find session high and low with their timestamps
  let highPrice = sorted[0].high;
  let highTime = sorted[0].time;
  let lowPrice = sorted[0].low;
  let lowTime = sorted[0].time;

  for (const c of sorted) {
    if (c.high > highPrice) {
      highPrice = c.high;
      highTime = c.time;
    }
    if (c.low < lowPrice) {
      lowPrice = c.low;
      lowTime = c.time;
    }
  }

  const highPivot: PivotPoint = {
    type: "high",
    price: highPrice,
    time: highTime,
    timeLabel: formatUTCTime(highTime),
  };

  const lowPivot: PivotPoint = {
    type: "low",
    price: lowPrice,
    time: lowTime,
    timeLabel: formatUTCTime(lowTime),
  };

  // P1 = whichever came first, P2 = whichever came second
  const p1 = highTime <= lowTime ? highPivot : lowPivot;
  const p2 = highTime <= lowTime ? lowPivot : highPivot;

  const targets = calculateConfidenceTargets(sorted, p1, p2);

  return { p1, p2, confidenceTargets: targets };
}

/**
 * Calculate confidence targets based on historical displacement from P2.
 * Targets represent price levels that X% of historical sessions reached.
 *
 * For now uses a simplified percentile approach on the candle data.
 * Will be replaced with DB-backed historical stats in Phase 1.
 */
function calculateConfidenceTargets(
  candles: CandleData[],
  p1: PivotPoint,
  p2: PivotPoint | null
): { ninety: number; fifty: number; twenty: number } {
  if (!p2) {
    // No P2 yet — estimate from P1 using average range
    const avgRange =
      candles.reduce((sum, c) => sum + (c.high - c.low), 0) / candles.length;
    const base = p1.price;
    const dir = p1.type === "low" ? 1 : -1;
    return {
      ninety: Math.round(base + dir * avgRange * 0.5),
      fifty: Math.round(base + dir * avgRange * 1.0),
      twenty: Math.round(base + dir * avgRange * 1.5),
    };
  }

  // With P2: targets extend beyond P2 based on historical range distribution
  const ranges = candles.map((c) => c.high - c.low).sort((a, b) => a - b);
  const p90 = ranges[Math.floor(ranges.length * 0.9)] ?? 0;
  const p50 = ranges[Math.floor(ranges.length * 0.5)] ?? 0;
  const p20 = ranges[Math.floor(ranges.length * 0.2)] ?? 0;

  const dir = p2.type === "high" ? 1 : -1;

  return {
    ninety: Math.round(p2.price + dir * p90 * 0.3),
    fifty: Math.round(p2.price + dir * p50 * 0.2),
    twenty: Math.round(p2.price + dir * p20 * 0.1),
  };
}

function formatUTCTime(unixSeconds: number): string {
  const d = new Date(unixSeconds * 1000);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm} UTC`;
}
