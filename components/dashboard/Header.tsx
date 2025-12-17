"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Heart,
  Plus,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Check,
  Calendar,
  Home,
  Info,
} from "lucide-react";

interface Props {
  name: string;
  role: "admin" | "owner" | "buyer";
  avatar?: string;
  onLogout?: () => void;
}

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:3001";

export default function Header({ name, role, avatar, onLogout }: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${API_BASE}/notifications`);
        if (res.ok) {
          const data = await res.json();
          // Sort by createdAt descending (newest first)
          const sorted = data.sort(
            (a: Notification, b: Notification) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setNotifications(sorted.slice(0, 10)); // Limit to 10
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Update each notification
      await Promise.all(
        notifications
          .filter((n) => !n.read)
          .map((n) =>
            fetch(`${API_BASE}/notifications/${n.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ read: true }),
            })
          )
      );
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Get time ago string
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar size={16} className="text-blue-500" />;
      case "property":
        return <Home size={16} className="text-emerald-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    owner: "bg-emerald-100 text-emerald-700",
    buyer: "bg-blue-100 text-blue-700",
  };

  const roleGradients: Record<string, string> = {
    admin: "from-purple-500 to-indigo-600",
    owner: "from-emerald-500 to-teal-600",
    buyer: "from-blue-500 to-cyan-600",
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      {/* Left: Dashboard Title */}
      <div className="flex items-center gap-3">
        <div
          className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${roleGradients[role]}`}
        />
        <div>
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500">
            Welcome back, {name.split(" ")[0]}!
          </p>
        </div>
      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-3">
        {/* Favorites (Buyer only) */}
        {role === "buyer" && (
          <Link
            href="/dashboard/buyer/favorites"
            title="Favorites"
            className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            <Heart size={20} />
          </Link>
        )}

        {/* Add Property (Owner only) */}
        {role === "owner" && (
          <Link
            href="/dashboard/owner/properties/new"
            title="Add Property"
            className={`p-2.5 rounded-full bg-gradient-to-r ${roleGradients[role]} text-white hover:opacity-90 transition shadow-md`}
          >
            <Plus size={20} />
          </Link>
        )}

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            title="Notifications"
            className={`relative p-2.5 rounded-full transition ${
              showNotifications
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Check size={12} />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">Loading...</p>
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-gray-900">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {getTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                )}
              </div>
              {/* {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              )} */}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200" />

        {/* User Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 p-1 pr-2 rounded-full hover:bg-gray-50 transition"
          >
            <div className="relative">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-white shadow"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleGradients[role]} flex items-center justify-center font-semibold text-white shadow`}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <span
                className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${roleColors[role]}`}
              >
                {role}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]">
              <div
                className={`px-4 py-4 bg-gradient-to-r ${roleGradients[role]}`}
              >
                <div className="flex items-center gap-3">
                  {avatar ? (
                    <Image
                      src={avatar}
                      alt={name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="text-xs text-white/80 capitalize">{role}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Link
                  href={`/dashboard/${role}/profile`}
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <User size={16} className="text-gray-400" />
                  View Profile
                </Link>
                <Link
                  href={`/dashboard/${role}/settings`}
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <Settings size={16} className="text-gray-400" />
                  Settings
                </Link>
                <div className="border-t border-gray-100 my-2" />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
