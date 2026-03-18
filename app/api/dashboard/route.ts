import { NextResponse } from "next/server";
import {
  calculateP1FlipRisk,
  calculateNewP2Confidence,
} from "@/lib/calculations";
import type { DashboardData } from "@/lib/types";

export async function GET() {
  // Mock historical data (replace with real CCXT + DB later)
  const mockHistory = Array.from({ length: 500 }, (_, i) => ({
    high: 52000 + Math.sin(i * 0.1) * 1500 + Math.random() * 500,
    low: 49000 + Math.sin(i * 0.1) * 1000 + Math.random() * 500,
  }));

  const mockMoves = [800, 1500, 900, 2000, 650, 1800, 1100, 2500, 750, 1300];

  const data: DashboardData = {
    p1FlipRisk: calculateP1FlipRisk(52000, 50500, mockHistory),
    newP2Confidence: calculateNewP2Confidence(1200, mockMoves),
    smallWickWarning: false,
    currentP1: { price: 50500, time: "14:32 UTC" },
    currentP2: { price: 53200, time: "Pending" },
    confidenceTargets: { ninety: 53000, fifty: 51500, twenty: 50800 },
  };

  return NextResponse.json(data);
}
