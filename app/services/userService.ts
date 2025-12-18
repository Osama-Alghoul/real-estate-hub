import { User } from "@/types/auth";
import { Property } from "@/types/property";
import bcrypt from "bcryptjs";

const API_BASE = process.env.JSON_SERVER_URL || "http://localhost:3001";

export async function fetchUsers(params?: {
  q?: string;
  role?: string;
  status?: string;
  _page?: number;
  _limit?: number;
}): Promise<{ data: User[]; total: number }> {
  const url = new URL(`${API_BASE}/users`);

  if (params) {
    if (params.role && params.role !== "all")
      url.searchParams.append("role", params.role);
    if (params.status && params.status !== "all")
      url.searchParams.append("status", params.status);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");

  let data: User[] = await res.json();

  // client-side filtering
  if (params?.q) {
    const q = params.q.toLowerCase();
    data = data.filter((u) => u.name.toLowerCase().includes(q));
  }

  const total = data.length;

  if (params?._page && params?._limit) {
    const start = (params._page - 1) * params._limit;
    data = data.slice(start, start + params._limit);
  }

  return { data, total };
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...user,
      createdAt: new Date().toISOString(),
      status: user.status || 'active'
    }),
  });
  
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser(
  id: string,
  user: Partial<User>
): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Failed to update user");

  const updatedUser = await res.json();

  if (user.avatar || user.name) {
    try {
      const propertiesRes = await fetch(
        `${API_BASE}/properties?ownerId=${id}`,
        { cache: "no-store" }
      );

      if (propertiesRes.ok) {
        const properties: Property[] = await propertiesRes.json();

        await Promise.all(
          properties.map((property) =>
            fetch(`${API_BASE}/properties/${property.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...(user.avatar ? { avatar: user.avatar } : {}),
                ...(user.name ? { owner: user.name } : {}),
              }),
            })
          )
        );
      }
    } catch (err) {
      console.error("Failed to sync properties owner info", err);
    }
  }

  return updatedUser;
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) throw new Error('Failed to delete user');
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");

  const user: User = await res.json();

  const isCurrentValid = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isCurrentValid) {
    throw new Error("Current password is incorrect");
  }

  const isSameAsOld = await bcrypt.compare(newPassword, user.password);
  if (isSameAsOld) {
    throw new Error("New password must be different from the old password");
  }



  /* Hash new password */
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  /* Update password */
  const updateRes = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: hashedPassword }),
  });

  if (!updateRes.ok) throw new Error("Failed to update password");
}
