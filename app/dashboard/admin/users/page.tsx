"use client";

import React, { useEffect, useMemo, useState } from "react";
import { User } from "@/types/auth";
import DataTable, { Column } from "@/components/common/DataTable";
import Pagination from "@/components/properties/Pagination";
import { Pencil, Trash, Power } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal";
import UserFormModal from "@/components/admin/UserFormModal";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "">("");
  const [statusFilter, setStatusFilter] = useState<User["status"] | "">("");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 7;

  // modal states
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [confirm, setConfirm] = useState<{
    open: boolean;
    user?: User;
    action?: "delete" | "toggle";
  }>({ open: false });

  const API_BASE = process.env.JSON_SERVER_URL || "http://localhost:3001";

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/users`);
      const data: User[] = await res.json();

      const enriched = data.map((u) => ({
        ...u,
        status: u.status ?? "active", // Default Status
        createdAt: u.createdAt ?? new Date().toISOString(),
      }));

      setUsers(enriched);
    } finally {
      setIsLoading(false);
    }
  }

  // Search + Filter
  const filtered = useMemo(() => {
    let list = [...users];

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
         u.email.toLowerCase().includes(s)
      );
    }

    if (roleFilter) list = list.filter((u) => u.role === roleFilter);
    if (statusFilter) list = list.filter((u) => u.status === statusFilter);

    return list;
  }, [users, search, roleFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // Table Columns
  const columns: Column<User>[] = [
    {
      key: "name",
      label: "Name",
      render: (r) => <div className="font-medium">{r.name}</div>,
    },
    { key: "email", label: "Email" },

    {
      key: "role",
      label: "Role",
      render: (r) => <span className="capitalize">{r.role}</span>,
    },

    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            r.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {r.status}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created",
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  const renderActions = (row: User) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setEditUser(row)}
        title="Edit"
        className="p-1 rounded hover:bg-gray-100"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={() => setConfirm({ open: true, user: row, action: "toggle" })}
        title={row.status === "active" ? "Disable" : "Enable"}
        className="p-1 rounded hover:bg-gray-100"
      >
        <Power size={16} />
      </button>
      <button
        onClick={() => setConfirm({ open: true, user: row, action: "delete" })}
        title="Delete"
        className="p-1 rounded hover:bg-gray-100 text-red-600"
      >
        <Trash size={16} />
      </button>
    </div>
  );

  // handlers for confirm actions (delete / toggle)
  async function handleConfirm(action: "delete" | "toggle", user?: User) {
    if (!user) return;
    setConfirm({ open: false });

    if (action === "delete") {
      await fetch(`${API_BASE}/users/${user.id}`, { method: "DELETE" });
    } else {
      await fetch(`${API_BASE}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: user.status === "active" ? "disabled" : "active",
        }),
      });
    }
    await fetchUsers();
  }

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search name or email..."
            className="border p-2 rounded w-64"
          />

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as any);
            }}
            className="border p-2 rounded"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="buyer">Buyer</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
            }}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      </div>
      {/* Data Table */}
      <DataTable
        data={paginated}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No users found"
        renderActions={renderActions}
      />
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
      {/* Modals (implement these components separately) */}
      {showCreate && (
        <UserFormModal
          open={showCreate}
          onClose={() => {
            setShowCreate(false);
          }}
          onSuccess={() => {
            setShowCreate(false);
            fetchUsers();
          }}
        />
      )}

      {editUser && (
        <UserFormModal
          open={Boolean(editUser)}
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => {
            setEditUser(null);
            fetchUsers();
          }}
        />
      )}

      {confirm.open && (
        <ConfirmModal
          title={confirm.action === "delete" ? "Delete user" : "Toggle status"}
          description={
            confirm.action === "delete"
              ? `Delete ${confirm.user?.name}?`
              : `Change status for ${confirm.user?.name}?`
          }
          onCancel={() => setConfirm({ open: false })}
          onConfirm={() => handleConfirm(confirm.action as any, confirm.user)}
        />
      )}
    </div>
  );
}
