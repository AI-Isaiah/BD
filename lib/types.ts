export interface DashboardData {
  p1FlipRisk: number;
  newP2Confidence: number;
  smallWickWarning: boolean;
  currentP1: { price: number; time: string };
  currentP2: { price: number; time: string };
  confidenceTargets: { ninety: number; fifty: number; twenty: number };
}
