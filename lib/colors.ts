export function getRiskColor(value: number): string {
  if (value < 35) return "text-emerald-400";
  if (value > 55) return "text-red-400";
  return "text-yellow-400";
}

export function getBiasColor(direction: "bullish" | "bearish" | "neutral"): string {
  if (direction === "bullish") return "text-emerald-400";
  if (direction === "bearish") return "text-red-400";
  return "text-yellow-400";
}

export function getBiasBg(direction: "bullish" | "bearish" | "neutral"): string {
  if (direction === "bullish") return "bg-emerald-950/30 border-emerald-500/20";
  if (direction === "bearish") return "bg-red-950/30 border-red-500/20";
  return "bg-yellow-950/30 border-yellow-500/20";
}
