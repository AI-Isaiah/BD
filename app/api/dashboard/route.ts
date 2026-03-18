import { NextResponse } from "next/server";
import {
  calculateP1FlipRisk,
  calculateNewP2Confidence,
} from "@/lib/calculations";
import { detectP1P2 } from "@/lib/p1p2-engine";
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
  const candles = generateMockCandles();

  // Detect P1/P2 dynamically from candle data
  const { p1, p2, confidenceTargets } = detectP1P2(candles);

  // Historical stats (mock — will use DB in Phase 1)
  const mockHistory = Array.from({ length: 500 }, (_, i) => ({
    high: 52000 + Math.sin(i * 0.1) * 1500 + Math.random() * 500,
    low: 49000 + Math.sin(i * 0.1) * 1000 + Math.random() * 500,
  }));
  const mockMoves = [800, 1500, 900, 2000, 650, 1800, 1100, 2500, 750, 1300];

  const data: DashboardData = {
    p1FlipRisk: calculateP1FlipRisk(candles[0].open, p1.price, mockHistory),
    newP2Confidence: calculateNewP2Confidence(
      p2 ? Math.abs(p2.price - p1.price) : 1200,
      mockMoves
    ),
    smallWickWarning: Math.random() > 0.7,
    currentP1: p1,
    currentP2: p2,
    confidenceTargets,
    candles,
  };

  return NextResponse.json(data);
}
