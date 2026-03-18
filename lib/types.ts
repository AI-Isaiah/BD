export interface CandleData {
  time: number; // Unix seconds (UTCTimestamp for lightweight-charts)
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PivotPoint {
  type: "high" | "low";
  price: number;
  time: number; // Unix seconds
  timeLabel: string; // "14:32 UTC"
}

export interface DashboardData {
  p1FlipRisk: number;
  newP2Confidence: number;
  smallWickWarning: boolean;
  currentP1: PivotPoint;
  currentP2: PivotPoint | null;
  confidenceTargets: { ninety: number; fifty: number; twenty: number };
  candles: CandleData[];
}
