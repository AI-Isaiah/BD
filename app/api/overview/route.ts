import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { symbol: "BTCUSDT", bias: "Bullish", timeHold: 68, distanceMove: 2.14, confidence: 74, p1FlipRisk: 38 },
    { symbol: "ETHUSDT", bias: "Neutral", timeHold: 51, distanceMove: 1.82, confidence: 62, p1FlipRisk: 47 },
    { symbol: "SOLUSDT", bias: "Bearish", timeHold: 39, distanceMove: 3.45, confidence: 29, p1FlipRisk: 71 },
    { symbol: "XRPUSDT", bias: "Bullish", timeHold: 72, distanceMove: 1.05, confidence: 81, p1FlipRisk: 22 },
    { symbol: "ADAUSDT", bias: "Neutral", timeHold: 55, distanceMove: 2.33, confidence: 58, p1FlipRisk: 44 },
    { symbol: "AVAXUSDT", bias: "Bullish", timeHold: 64, distanceMove: 1.95, confidence: 69, p1FlipRisk: 33 },
    { symbol: "LINKUSDT", bias: "Neutral", timeHold: 48, distanceMove: 2.78, confidence: 53, p1FlipRisk: 51 },
    { symbol: "DOTUSDT", bias: "Bearish", timeHold: 36, distanceMove: 3.12, confidence: 31, p1FlipRisk: 66 },
    { symbol: "MATICUSDT", bias: "Bullish", timeHold: 61, distanceMove: 1.67, confidence: 71, p1FlipRisk: 29 },
    { symbol: "DOGEUSDT", bias: "Neutral", timeHold: 44, distanceMove: 4.21, confidence: 45, p1FlipRisk: 55 },
  ]);
}
