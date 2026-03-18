import { NextResponse } from "next/server";
import {
  calculateP1FlipRisk,
  calculateNewP2Confidence,
} from "@/lib/calculations";
import type { CandleData, DashboardData } from "@/lib/types";

function generateMockCandles(): CandleData[] {
  const candles: CandleData[] = [];
  const now = Math.floor(Date.now() / 1000);
  const daySeconds = 86400;
  const basePrice = 49500;

  for (let i = 29; i >= 0; i--) {
    const time = now - i * daySeconds;
    const drift = Math.sin((30 - i) * 0.2) * 1500 + (30 - i) * 50;
    const noise = Math.sin(i * 7.3) * 500;
    const open = Math.max(48000, Math.min(54000, basePrice + drift + noise));
    const closeOffset = Math.sin(i * 3.1) * 800;
    const close = Math.max(48000, Math.min(54000, open + closeOffset));
    const high = Math.min(55000, Math.max(open, close) + Math.abs(Math.sin(i * 5.7) * 600) + 100);
    const low = Math.max(47000, Math.min(open, close) - Math.abs(Math.sin(i * 4.3) * 600) - 100);

    candles.push({
      time,
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
    });
  }
  return candles;
}

export async function GET() {
  const mockHistory = Array.from({ length: 500 }, (_, i) => ({
    high: 52000 + Math.sin(i * 0.1) * 1500 + Math.random() * 500,
    low: 49000 + Math.sin(i * 0.1) * 1000 + Math.random() * 500,
  }));

  const mockMoves = [800, 1500, 900, 2000, 650, 1800, 1100, 2500, 750, 1300];

  const data: DashboardData = {
    p1FlipRisk: calculateP1FlipRisk(52000, 50500, mockHistory),
    newP2Confidence: calculateNewP2Confidence(1200, mockMoves),
    smallWickWarning: Math.random() > 0.7,
    currentP1: { price: 50500, time: "14:32 UTC" },
    currentP2: { price: 53200, time: "Pending" },
    confidenceTargets: { ninety: 53000, fifty: 51500, twenty: 50800 },
    candles: generateMockCandles(),
  };

  return NextResponse.json(data);
}
