import React from "react";
import "./SynergyMetrics.css";
type MetricItem = {
  label: string;
  value: string;
  status: "HIGH" | "MEDIUM" | "LOW";
};

type SynergyMetricsProps = {
  metrics: MetricItem[];
};
const synergyMetrics = [
  {
    label: "Footprint consolidation",
    value: "39% of target branches are within 10km of buyer branches",
    status: "HIGH" as const,
  },
  {
    label: "Overhead rationalization",
    value: "54% of country organizations overlap",
    status: "HIGH" as const,
  },
  {
    label: "IT Infrastructure savings",
    value: "Both firms run on Temenos platform",
    status: "HIGH" as const,
  },
  {
    label: "Cross-selling potential",
    value: "Adds 25 additional local markets with 16 million consumers",
    status: "MEDIUM" as const,
  },
  {
    label: "Total",
    value:
      "Indicates synergies above precedent median of 18% of target revenue",
    status: "HIGH" as const,
  },
];
const SynergyMetrics: React.FC<SynergyMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm max-w-2xl synergy-metrics-container">
      <div className=" metrics-animation w-full h-full z-10"></div>
      <div className="space-y-4 border border-gray-200 rounded-lg">
        {synergyMetrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b last:border-b-0"
          >
            <div className="space-y-1">
              <div className="text-gray-900 font-medium">{metric.label}</div>
              <div className="text-gray-600 text-sm">{metric.value}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                metric.status === "HIGH"
                  ? "bg-green-100 text-green-800"
                  : metric.status === "MEDIUM"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {metric.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SynergyMetrics;
