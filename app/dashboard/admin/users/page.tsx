"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth";
import { fetchUsers } from "@/app/services/userService";
import DataTable, { Column } from "@/components/common/DataTable";
import AddUserModal from "@/components/users/AddUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import DeleteUserModal from "@/components/users/DeleteUserModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Pagination from "@/components/properties/Pagination";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 5;

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data, total } = await fetchUsers({
        q: search,
        role: roleFilter,
        status: statusFilter,
        _page: page,
        _limit: limit,
      });
      setUsers(data);
      setTotal(total);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, roleFilter, statusFilter, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns: Column<User>[] = [
    { key: "id", label: "ID" },
    {
      key: "avatar",
      label: "Image",
      render: (row) => (
        <div className="flex items-center justify-center">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-20 h-20 object-cover rounded-full border-2 border-gray-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
          />
        </div>
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row) => <span className="capitalize">{row.role}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status || "disabled"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <AddUserModal onSuccess={loadUsers} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
          className="md:w-1/3"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded p-2 bg-white"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="buyer">Buyer</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 bg-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <DataTable
        data={users}
        columns={columns}
        isLoading={loading}
        renderActions={(row) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingUser(row)}
            >
              <Edit className="w-4 h-4 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeletingUser(row)}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        )}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {total > limit && (
          <Pagination
            totalPages={Math.ceil(total / limit)}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>

      <EditUserModal
        user={editingUser}
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
        onSuccess={loadUsers}
      />

      <DeleteUserModal
        user={deletingUser}
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onSuccess={loadUsers}
      />
    </div>
  );
}
