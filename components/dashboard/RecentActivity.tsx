import React from "react";
import { User } from "../../types/auth";
import { Property } from "../../types/property";
import { UserPlus, Home } from "lucide-react";

interface RecentActivityProps {
  users: User[];
  properties: Property[];
}

export default function RecentActivity({
  users,
  properties,
}: RecentActivityProps) {
  // Combine and sort activities (mocking timestamps since they might not exist)
  // We'll take the last 3 users and last 3 properties
  const recentUsers = users.slice(-3).map((user) => ({
    type: "user",
    id: user.id,
    name: user.name,
    details: `New ${user.role} registered`,
    time: "Just now", // Mock time
    icon: UserPlus,
    color: "bg-green-50 text-green-600",
  }));

  const recentProperties = properties.slice(-3).map((property) => ({
    type: "property",
    id: property.id,
    name: property.title,
    details: `New property listed in ${
      property.location || "Unknown Location"
    }`,
    time: "2h ago", // Mock time
    icon: Home,
    color: "bg-blue-50 text-blue-600",
  }));

  const activities = [...recentUsers, ...recentProperties];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">
        Recent Activity
      </h3>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={`${activity.type}-${activity.id}-${index}`}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-default"
          >
            <div
              className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform duration-200 shadow-sm`}
            >
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {activity.name}
                </p>
                <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-full">
                  {activity.time}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {activity.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
