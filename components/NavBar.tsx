"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Timeframe } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/time-explorer", label: "Time Explorer" },
  { href: "/distance-explorer", label: "Distance Explorer" },
  { href: "/summary", label: "Summary" },
] as const;

const TIMEFRAMES: { value: Timeframe; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "4h", label: "4H" },
  { value: "weekly", label: "Weekly" },
];

function NavBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTf = searchParams.get("tf") ?? "daily";

  return (
    <nav className="border-b border-[#1F1F1F] p-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="font-bold text-xl text-white">Brighter Data</span>
        <div className="flex gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={`${link.href}?tf=${currentTf}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1F1F1F] text-white"
                    : "text-[#888888] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="BTCUSDT"
          className="bg-[#111] px-4 py-2 rounded-lg border border-[#1F1F1F] text-white text-sm w-32"
        />
        <div className="flex gap-1">
          {TIMEFRAMES.map((tf) => {
            const isActive = currentTf === tf.value;
            return (
              <Link
                key={tf.value}
                href={`${pathname}?tf=${tf.value}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-[#111] border border-[#1F1F1F] text-[#888888] hover:text-white"
                }`}
              >
                {tf.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function NavBar() {
  return (
    <Suspense
      fallback={
        <nav className="border-b border-[#1F1F1F] p-4 h-[64px]" />
      }
    >
      <NavBarInner />
    </Suspense>
  );
}
