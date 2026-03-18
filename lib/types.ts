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

export type Timeframe = "daily" | "4h" | "weekly" | "monthly";

export interface TimeStatBucket {
  bucket: string;
  highFormationPct: number;
  lowFormationPct: number;
  highHoldPct: number;
  lowHoldPct: number;
  takenOutAfterHighPct: number;
  takenOutAfterLowPct: number;
  earlyWarning: boolean;
}

export interface TimeExplorerData {
  timeframe: Timeframe;
  buckets: TimeStatBucket[];
  currentP1Bucket: string;
  totalSamples: number;
}

export interface DistanceStatBucket {
  movePctBucket: number;
  label: string;
  highHoldPct: number;
  lowHoldPct: number;
  continuedFurtherPct: number;
  reversalAfterPct: number;
  smallWickWarning: boolean;
  p1FlipRisk: number;
}

export interface DistanceExplorerData {
  timeframe: Timeframe;
  buckets: DistanceStatBucket[];
  currentMovePct: number;
  currentBucketIdx: number;
  totalSamples: number;
}

export interface SummaryData {
  timeframe: Timeframe;
  biasDirection: "bullish" | "bearish" | "neutral";
  biasConfidence: number;
  overallP1FlipRisk: number;
  confidenceTargets: { ninety: number; fifty: number; twenty: number };
  pivotStrength: "strong" | "weak";
  pivotHoldPct: number;
}

export interface SummaryPageData {
  daily: SummaryData;
  weekly: SummaryData;
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
