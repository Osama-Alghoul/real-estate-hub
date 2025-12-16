"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../../../components/dashboard/StatsCard";
import {
  PropertiesChart,
  UsersGrowthChart,
  PropertyStatusChart,
  UserRoleChart,
} from "../../../components/dashboard/DashboardCharts";
import RecentActivity from "../../../components/dashboard/RecentActivity";
import RecentBookings, {
  Booking,
} from "../../../components/dashboard/RecentBookings";
import { Users, Home, Key, Clock } from "lucide-react";
import { User } from "../../../types/auth";
import { Property } from "../../../types/property.type";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminLandingPage() {
  const { user } = useAuth();
  const [data, setData] = useState<{
    users: User[];
    properties: Property[];
    bookings: Booking[];
  }>({
    users: [],
    properties: [],
    bookings: [],
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    activeOwners: 0,
    pendingProperties: 0,
  });
  const [chartData, setChartData] = useState<{
    properties: number[];
    users: number[];
    propertyStatus: { name: string; value: number }[];
    userRoles: { name: string; value: number }[];
  }>({
    properties: [],
    users: [],
    propertyStatus: [],
    userRoles: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, propertiesRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:3001/users"),
          axios.get("http://localhost:3001/properties"),
          axios.get("http://localhost:3001/bookings"),
        ]);

        const users: User[] = usersRes.data;
        const properties: Property[] = propertiesRes.data;
        const bookings: Booking[] = bookingsRes.data;

        setData({ users, properties, bookings });
        setStats({
          totalUsers: users.length,
          totalProperties: properties.length,
          activeOwners: users.filter(
            (u) => u.role === "owner" && u.status === "active"
          ).length,
          pendingProperties: properties.filter((p) => p.status === "pending")
            .length,
        });

        // Generate dynamic chart data based on totals
        // Since we don't have historical data, we simulate a growth curve ending at the current total
        const generateGrowthCurve = (total: number, steps: number) => {
          const data = [];
          let current = Math.floor(total * 0.2); // Start at 20%
          const increment = (total - current) / steps;

          for (let i = 0; i < steps; i++) {
            // Add some randomness to the growth
            const variation = Math.random() * increment * 0.5;
            current +=
              increment + (Math.random() > 0.5 ? variation : -variation);
            data.push(Math.max(Math.floor(current), 0));
          }
          // Ensure the last point matches the total (or close to it)
          data[data.length - 1] = total;
          return data;
        };

        // Calculate Property Status Distribution
        // Calculate Property Status Distribution
        const propertyStatusCounts = properties.reduce((acc, curr) => {
          const status = curr.status || "unknown";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const propertyStatusData = Object.entries(propertyStatusCounts).map(
          ([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
          })
        );

        // Calculate User Role Distribution
        const userRoleCounts = users.reduce((acc, curr) => {
          acc[curr.role] = (acc[curr.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const userRoleData = Object.entries(userRoleCounts).map(
          ([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value,
          })
        );

        setChartData({
          properties: generateGrowthCurve(properties.length, 12),
          users: generateGrowthCurve(users.length, 12),
          propertyStatus: propertyStatusData,
          userRoles: userRoleData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-8 bg-gray-50 min-h-screen animate-pulse">
        <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">{user?.name}</span>
          </p>
        </div>
        <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-sm text-gray-500 font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Last updated: {new Date().toDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          trend="+12%"
          trendUp={true}
          description="vs last month"
        />
        <StatsCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={Home}
          trend="+5%"
          trendUp={true}
          description="vs last month"
        />
        <StatsCard
          title="Active Owners"
          value={stats.activeOwners}
          icon={Key}
          trend="+2"
          trendUp={true}
          description="new this month"
        />
        <StatsCard
          title="Pending Properties"
          value={stats.pendingProperties}
          icon={Clock}
          description="Awaiting approval"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PropertiesChart data={chartData.properties} />
        <UsersGrowthChart data={chartData.users} />
      </div>

      {/* Distribution Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyStatusChart data={chartData.propertyStatus} />
        <UserRoleChart data={chartData.userRoles} />
      </div>

      {/* Activity & Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity users={data.users} properties={data.properties} />
        <RecentBookings bookings={data.bookings} />
      </div>
    </div>
  );
}
