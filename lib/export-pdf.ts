import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { SummaryData } from "./types";

export function exportTradingPlan(summary: SummaryData, symbol: string) {
  const doc = new jsPDF();
  const date = new Date().toISOString().slice(0, 10);

  // Title
  doc.setFontSize(22);
  doc.text(`BrighterData Trading Plan`, 20, 25);
  doc.setFontSize(14);
  doc.setTextColor(100);
  doc.text(`${symbol} — ${date}`, 20, 35);

  // Bias
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text(`Overall Bias: ${summary.biasDirection.toUpperCase()}`, 20, 55);
  doc.setFontSize(12);
  doc.text(`Confidence: ${summary.biasConfidence}%`, 20, 65);

  // Confidence Targets
  doc.setFontSize(16);
  doc.text(`Confidence Targets`, 20, 85);
  doc.setFontSize(12);
  doc.text(`90% → ${summary.confidenceTargets.ninety.toLocaleString()}`, 30, 97);
  doc.text(`50% → ${summary.confidenceTargets.fifty.toLocaleString()}`, 30, 107);
  doc.text(`20% → ${summary.confidenceTargets.twenty.toLocaleString()}`, 30, 117);

  // Key insights table
  autoTable(doc, {
    startY: 135,
    head: [["Key Insight", "Value"]],
    body: [
      ["Pivot Strength", summary.pivotStrength.toUpperCase()],
      ["Hold Probability", `${summary.pivotHoldPct}%`],
      ["P1 Flip Risk", `${summary.overallP1FlipRisk}%`],
      [
        "Recommended Action",
        summary.biasDirection === "bullish"
          ? "LONG — Target 90% confidence level"
          : summary.biasDirection === "bearish"
            ? "SHORT — Watch for P1 flip"
            : "FLAT — Wait for clearer bias",
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: [0, 180, 134] },
  });

  doc.save(`${symbol}_Trading_Plan_${date}.pdf`);
}
