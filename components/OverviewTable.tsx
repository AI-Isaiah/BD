"use client";

interface Asset {
  symbol: string;
  bias: string;
  timeHold: number;
  distanceMove: number;
  confidence: number;
  p1FlipRisk: number;
}

interface Props {
  data: Asset[];
}

export default function OverviewTable({ data }: Props) {
  return (
    <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#1F1F1F] text-xs text-gray-400 uppercase tracking-wider">
            <th className="py-3 px-4">Symbol</th>
            <th className="py-3 px-4">Bias</th>
            <th className="py-3 px-4">Time Hold %</th>
            <th className="py-3 px-4">Distance Move %</th>
            <th className="py-3 px-4">Confidence</th>
            <th className="py-3 px-4">P1 Flip Risk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr
              key={a.symbol}
              className="border-b border-[#1F1F1F] hover:bg-[#1A1A1A] transition-colors"
            >
              <td className="py-4 px-4 font-mono font-bold text-white">
                {a.symbol}
              </td>
              <td
                className={`py-4 px-4 font-semibold ${
                  a.bias === "Bullish"
                    ? "text-emerald-400"
                    : a.bias === "Bearish"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {a.bias}
              </td>
              <td className="py-4 px-4 text-gray-300">{a.timeHold}%</td>
              <td className="py-4 px-4 text-gray-300">{a.distanceMove}%</td>
              <td className="py-4 px-4 font-mono text-gray-300">
                {a.confidence}%
              </td>
              <td
                className={`py-4 px-4 font-medium ${
                  a.p1FlipRisk > 55
                    ? "text-red-400"
                    : a.p1FlipRisk > 35
                      ? "text-yellow-400"
                      : "text-emerald-400"
                }`}
              >
                {a.p1FlipRisk}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
