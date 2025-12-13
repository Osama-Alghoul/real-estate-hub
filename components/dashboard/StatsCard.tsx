import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  description?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  description,
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.15)] hover:border-blue-100 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
            {value}
          </h3>
        </div>
        <div className="p-3 bg-blue-50/50 rounded-xl group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
      {(trend || description) && (
        <div className="mt-4 flex items-center text-sm relative z-10">
          {trend && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                trendUp
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-red-50 text-red-700 border border-red-100"
              } mr-2`}
            >
              {trend}
            </span>
          )}
          {description && (
            <span className="text-gray-400 font-medium text-xs">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
