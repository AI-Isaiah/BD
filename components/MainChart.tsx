"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, ColorType, LineStyle } from "lightweight-charts";
import type { IChartApi, UTCTimestamp } from "lightweight-charts";
import type { DashboardData } from "@/lib/types";

interface MainChartProps {
  data: DashboardData;
}

export default function MainChart({ data }: MainChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#111111" },
        textColor: "#AAAAAA",
      },
      grid: {
        vertLines: { color: "#1F1F1F" },
        horzLines: { color: "#1F1F1F" },
      },
      rightPriceScale: {
        borderColor: "#1F1F1F",
      },
      timeScale: {
        borderColor: "#1F1F1F",
        timeVisible: false,
      },
      crosshair: {
        vertLine: { color: "#555555", labelBackgroundColor: "#333333" },
        horzLine: { color: "#555555", labelBackgroundColor: "#333333" },
      },
    });
    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00E5CC",
      downColor: "#FF4976",
      borderVisible: false,
      wickUpColor: "#00E5CC",
      wickDownColor: "#FF4976",
    });

    candleSeries.setData(
      data.candles.map((c) => ({ ...c, time: c.time as UTCTimestamp }))
    );

    // P1 line: solid teal
    candleSeries.createPriceLine({
      price: data.currentP1.price,
      color: "#00E5CC",
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      axisLabelVisible: true,
      title: "P1",
    });

    // P2 line: dashed green
    candleSeries.createPriceLine({
      price: data.currentP2.price,
      color: "#00FF9D",
      lineWidth: 2,
      lineStyle: LineStyle.Dashed,
      axisLabelVisible: true,
      title: "P2",
    });

    // 90% confidence target: blue
    candleSeries.createPriceLine({
      price: data.confidenceTargets.ninety,
      color: "#3B82F6",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: "90%",
    });

    // 50% confidence target: yellow
    candleSeries.createPriceLine({
      price: data.confidenceTargets.fifty,
      color: "#F5A623",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: "50%",
    });

    // 20% confidence target: gray
    candleSeries.createPriceLine({
      price: data.confidenceTargets.twenty,
      color: "#888888",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: true,
      title: "20%",
    });

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-3xl overflow-hidden"
    />
  );
}
