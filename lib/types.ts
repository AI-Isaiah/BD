export interface CandleData {
  time: number; // Unix seconds (UTCTimestamp for lightweight-charts)
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface DashboardData {
  p1FlipRisk: number;
  newP2Confidence: number;
  smallWickWarning: boolean;
  currentP1: { price: number; time: string };
  currentP2: { price: number; time: string };
  confidenceTargets: { ninety: number; fifty: number; twenty: number };
  candles: CandleData[];
}
