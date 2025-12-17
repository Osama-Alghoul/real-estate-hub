"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building,
  ChartAreaIcon,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  MessagesSquare,
  User,
  Heart,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

interface Props {
  role: "admin" | "owner" | "buyer";
  onLogout: () => void;
}

export default function Sidebar({ role, onLogout }: Props) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const links: Record<string, NavItem[]> = {
    admin: [
      {
        name: "Overview",
        href: "/dashboard/admin",
        icon: <LayoutDashboard size={20} />,
      },
      {
        name: "Users",
        href: "/dashboard/admin/users",
        icon: <Users size={20} />,
      },
      {
        name: "Properties",
        href: "/dashboard/admin/properties",
        icon: <Building size={20} />,
      },
      {
        name: "Reports",
        href: "/dashboard/admin/reports",
        icon: <ChartAreaIcon size={20} />,
      },
      {
        name: "Settings",
        href: "/dashboard/admin/settings",
        icon: <Settings size={20} />,
      },
      {
        name: "Profile",
        href: "/dashboard/admin/profile",
        icon: <User size={20} />,
      },
    ],
    owner: [
      {
        name: "Overview",
        href: "/dashboard/owner",
        icon: <LayoutDashboard size={20} />,
      },
      {
        name: "My Properties",
        href: "/dashboard/owner/properties",
        icon: <Building size={20} />,
      },
      {
        name: "Add Property",
        href: "/dashboard/owner/new",
        icon: <Plus size={20} />,
      },
      {
        name: "Massages",
        href: "/dashboard/owner/massages",
        icon: <MessagesSquare size={20} />,
      },
      {
        name: "Profile",
        href: "/dashboard/buyer/profile",
        icon: <User size={20} />,
      },
    ],
    buyer: [
      {
        name: "Overview",
        href: "/dashboard/buyer",
        icon: <LayoutDashboard size={20} />,
      },
      {
        name: "Favorites",
        href: "/dashboard/buyer/favorites",
        icon: <Heart size={20} />,
      },
      { name: "Explore", href: "/dashboard/buyer/properties", icon: <Building size={20} /> },
      {
        name: "My Requests",
        href: "/dashboard/buyer/requests",
        icon: <MessagesSquare size={20} />,
      },
      {
        name: "Profile",
        href: "/dashboard/buyer/profile",
        icon: <User size={20} />,
      },
    ],
  };

  const nav = links[role] || [];

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm flex flex-col transition-all duration-300 
      ${open ? "w-48" : "w-20"}`}
    >
      {/* top side */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1
          className={`font-bold text-xl transition-all ${
            !open && "opacity-0 w-0"
          }`}
        >
          REIS
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-gray-100"
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* links */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md transition ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            >
              {item.icon}

              {open && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* logout btn */}
      <div className="p-3 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          {open && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
