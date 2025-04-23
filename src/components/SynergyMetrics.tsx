import React from "react";
import "./SynergyMetrics.css";

type SynergyItem = {
  metric: string;
  detail: string;
  rating: "HIGH" | "MEDIUM" | "LOW";
};

type SynergyMetricsProps = {
  items: SynergyItem[];
};

const SynergyMetrics: React.FC<SynergyMetricsProps> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm max-w-2xl synergy-metrics-container">
      <div className="metrics-animation w-full h-full z-10"></div>
      <div className="space-y-4 border border-gray-200 rounded-lg">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b last:border-b-0"
          >
            <div className="space-y-1">
              <div className="text-gray-900 font-medium">{item.metric}</div>
              <div className="text-gray-600 text-sm">{item.detail}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.rating === "HIGH"
                  ? "bg-green-100 text-green-800"
                  : item.rating === "MEDIUM"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {item.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SynergyMetrics;
