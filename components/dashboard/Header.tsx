"use client";

import {
  Bell,
  MessagesSquare,
  Heart,
  Plus,
} from "lucide-react";

interface Props {
  name: string;
  role: "admin" | "owner" | "buyer";
}

export default function Header({ name, role }: Props) {

  const roleIcons: Record<string, { id: string; icon: JSX.Element }[]> = {
    admin: [
      { id: "notice", icon: <Bell size={20} /> },
    ],
    owner: [
      { id: "requests", icon: <MessagesSquare size={20} /> },
      { id: "notice", icon: <Bell size={20} /> },
      { id: "add", icon: <Plus size={20} /> },
    ],
    buyer: [
      { id: "notice", icon: <Bell size={20} /> },
      { id: "fav", icon: <Heart size={20} /> },
      { id: "requests", icon: <MessagesSquare size={20} /> },
    ],
  };

  const icons = roleIcons[role] ?? [];
  console.log("HEADER ROLE:", role);

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow flex-wrap gap-4">

      <div className="flex items-center gap-4 flex-1 min-w-[250px]">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <div className="hidden md:flex items-center bg-gray-100 rounded px-3 py-2 w-full">
          <input
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search properties..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {icons.map((item) => (
          <button
            key={item.id}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
          >
            {item.icon}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2">

          <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="text-sm">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500 capitalize">{role}</div>
          </div>
        </div>
      </div>

    </header>
  );
}
