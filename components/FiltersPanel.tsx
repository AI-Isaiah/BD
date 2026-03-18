"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface FilterSettings {
  minHoldRate: number;
  maxFlipRisk: number;
  wickThreshold: number;
  showOnlyCrypto: boolean;
  timeframe: string;
}

const DEFAULTS: FilterSettings = {
  minHoldRate: 42,
  maxFlipRisk: 58,
  wickThreshold: 0.32,
  showOnlyCrypto: true,
  timeframe: "daily",
};

export default function FiltersPanel() {
  const [settings, setSettings] = useState<FilterSettings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brighterdata-filters");
    if (saved) setSettings(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("brighterdata-filters", JSON.stringify(settings));
    }
  }, [settings, loaded]);

  const update = (key: keyof FilterSettings, value: number | boolean | string) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Recommended Settings */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Save className="w-5 h-5 text-emerald-400" />
          Official Recommended Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#1F1F1F]">
            <p className="text-xs text-gray-400 mb-1">Min Hold Rate</p>
            <p className="text-3xl font-bold text-emerald-400">42%</p>
          </div>
          <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#1F1F1F]">
            <p className="text-xs text-gray-400 mb-1">Max P1 Flip Risk</p>
            <p className="text-3xl font-bold text-red-400">58%</p>
          </div>
          <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#1F1F1F]">
            <p className="text-xs text-gray-400 mb-1">Wick Warning Threshold</p>
            <p className="text-3xl font-bold text-yellow-400">0.32%</p>
          </div>
        </div>
      </div>

      {/* User Filters */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Your Filters (saved automatically)
        </h2>
        <div className="space-y-8">
          {/* Min Hold Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Minimum Hold Rate</label>
              <span className="text-lg font-mono text-white">{settings.minHoldRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.minHoldRate}
              onChange={(e) => update("minHoldRate", Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Max Flip Risk */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Max P1 Flip Risk</label>
              <span className="text-lg font-mono text-white">{settings.maxFlipRisk}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.maxFlipRisk}
              onChange={(e) => update("maxFlipRisk", Number(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          {/* Wick Threshold */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Wick Warning Threshold</label>
              <span className="text-lg font-mono text-white">{settings.wickThreshold.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.wickThreshold * 100}
              onChange={(e) => update("wickThreshold", Number(e.target.value) / 100)}
              className="w-full accent-yellow-500"
            />
          </div>

          {/* Show Only Crypto */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Show Only Crypto Assets</label>
            <button
              onClick={() => update("showOnlyCrypto", !settings.showOnlyCrypto)}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.showOnlyCrypto ? "bg-emerald-500" : "bg-[#333]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showOnlyCrypto ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => setSettings(DEFAULTS)}
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Reset to recommended
          </button>
        </div>
      </div>
    </div>
  );
}
