/**
 * Calculate P1 flip risk: percentage of historical periods where
 * high reached >= openPrice * 1.003 AND low dropped to <= currentP1.
 *
 * Simplified price-based heuristic — will be replaced with
 * time-slot-based pctP1FormedAtOrAfterP2Slot when real data arrives.
 */
export function calculateP1FlipRisk(
  openPrice: number,
  currentP1: number,
  historicalPeriods: Array<{ high: number; low: number }>
): number {
  const minMove = 0.003; // 0.3% as shown in Part 1
  const qualifying = historicalPeriods.filter(
    (p) => p.high >= openPrice * (1 + minMove)
  );
  const flipped = qualifying.filter((p) => p.low <= currentP1);
  return qualifying.length
    ? Math.round((flipped.length / qualifying.length) * 100 * 10) / 10
    : 50.0;
}

/**
 * Calculate new P2 confidence: percentage of historical moves
 * that exceeded the current move magnitude.
 *
 * Direct port of the percentile logic from computeP2ConfidenceTargets.
 */
export function calculateNewP2Confidence(
  currentMove: number,
  historicalMoves: number[]
): number {
  const better = historicalMoves.filter((m) => Math.abs(m) > Math.abs(currentMove));
  return historicalMoves.length
    ? Math.round((better.length / historicalMoves.length) * 100)
    : 75;
}
