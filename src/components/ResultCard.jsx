/**
 * ResultCard Component
 * Displays GST calculation results in a visually appealing card grid
 */
import React from "react";
import { formatCurrency } from "../utils/gstCalculator";
import { TrendingUp, Percent, IndianRupee, Calculator } from "lucide-react";

const STAT_CARDS = [
  {
    key: "baseAmount",
    label: "Base Amount",
    icon: IndianRupee,
    colorClass: "from-blue-500 to-blue-600",
    bgClass: "bg-blue-50",
    iconBg: "bg-blue-500",
  },
  {
    key: "gstRate",
    label: "GST Rate",
    icon: Percent,
    colorClass: "from-purple-500 to-purple-600",
    bgClass: "bg-purple-50",
    iconBg: "bg-purple-500",
    suffix: "%",
    noFormat: true,
  },
  {
    key: "gstAmount",
    label: "GST Amount",
    icon: Calculator,
    colorClass: "from-emerald-500 to-emerald-600",
    bgClass: "bg-emerald-50",
    iconBg: "bg-emerald-500",
  },
  {
    key: "totalAmount",
    label: "Total Amount",
    icon: TrendingUp,
    colorClass: "from-indigo-600 to-violet-600",
    bgClass: "bg-indigo-50",
    iconBg: "bg-gradient-to-br from-indigo-600 to-violet-600",
    highlight: true,
  },
];

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="animate-slideUp">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 inline-block" />
        Calculation Results
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, iconBg, bgClass, highlight, suffix, noFormat }) => {
          const rawValue = result[key];
          const displayValue = noFormat
            ? `${rawValue}${suffix || ""}`
            : formatCurrency(rawValue);

          return (
            <div
              key={key}
              className={`
                relative rounded-2xl p-4 border transition-all duration-300
                hover:shadow-lg hover:-translate-y-0.5 group
                ${highlight
                  ? "bg-gradient-to-br from-indigo-600 to-violet-600 border-transparent text-white shadow-indigo-200 shadow-md"
                  : `${bgClass} border-slate-100`
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-9 h-9 rounded-xl flex items-center justify-center mb-3
                  ${highlight ? "bg-white/20" : `${iconBg} text-white`}
                `}
              >
                <Icon size={18} className={highlight ? "text-white" : "text-white"} />
              </div>

              {/* Label */}
              <p className={`text-xs font-semibold mb-1 uppercase tracking-wider ${highlight ? "text-indigo-200" : "text-slate-500"}`}>
                {label}
              </p>

              {/* Value */}
              <p className={`text-lg font-bold leading-tight ${highlight ? "text-white" : "text-slate-800"}`}>
                {displayValue}
              </p>

              {/* Decorative circle */}
              <div className={`absolute -right-2 -bottom-2 w-10 h-10 rounded-full opacity-10 ${highlight ? "bg-white" : "bg-slate-400"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
