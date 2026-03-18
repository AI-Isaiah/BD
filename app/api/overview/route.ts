import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { symbol: "BTCUSDT", bias: "Bullish", timeHold: 68, distanceMove: 2.14, confidence: 74, p1FlipRisk: 38 },
    { symbol: "ETHUSDT", bias: "Neutral", timeHold: 51, distanceMove: 1.82, confidence: 62, p1FlipRisk: 47 },
    { symbol: "SOLUSDT", bias: "Bearish", timeHold: 39, distanceMove: 3.45, confidence: 29, p1FlipRisk: 71 },
    { symbol: "XRPUSDT", bias: "Bullish", timeHold: 72, distanceMove: 1.05, confidence: 81, p1FlipRisk: 22 },
    { symbol: "ADAUSDT", bias: "Neutral", timeHold: 55, distanceMove: 2.33, confidence: 58, p1FlipRisk: 44 },
  ]);
}
