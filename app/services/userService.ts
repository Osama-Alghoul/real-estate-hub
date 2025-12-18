import { User } from "@/types/auth";
import { Property } from "@/types/property.type";

const API_BASE = process.env.JSON_SERVER_URL || 'http://localhost:3001';

// export async function fetchUsers(params?: {
//   q?: string;
//   role?: string;
//   status?: string;
//   _page?: number;
//   _limit?: number;
// }): Promise<{ data: User[]; total: number }> {
//   const url = new URL(`${API_BASE}/users`);
  
//   const isSearching = !!params?.q;
  
//   if (params) {
//     if (!isSearching) {
//       if (params._page) url.searchParams.append('_page', params._page.toString());
//       if (params._limit) url.searchParams.append('_limit', params._limit.toString());
//     }
    
//     if (params.role && params.role !== 'all') url.searchParams.append('role', params.role);
//     if (params.status && params.status !== 'all') url.searchParams.append('status', params.status);
//   }

//   const res = await fetch(url.toString(), { cache: 'no-store' });
//   if (!res.ok) throw new Error('Failed to fetch users');
  
//   let data: User[] = await res.json();
//   let total = Number(res.headers.get('X-Total-Count') || data.length);

//   if (isSearching && params?.q) {
//     const q = params.q.toLowerCase();
//     data = data.filter(u => u.name.toLowerCase().includes(q));
//     total = data.length;
    
//     if (params._page && params._limit) {
//       const start = (params._page - 1) * params._limit;
//       data = data.slice(start, start + params._limit);
//     }
//   }
  
//   return { data, total };
// }
export async function fetchUsers(params?: {
  q?: string;
  role?: string;
  status?: string;
  _page?: number;
  _limit?: number;
}): Promise<{ data: User[]; total: number }> {
  const url = new URL(`${API_BASE}/users`);

  if (params) {
    if (params.role && params.role !== 'all') url.searchParams.append('role', params.role);
    if (params.status && params.status !== 'all') url.searchParams.append('status', params.status);
  }

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch users');

  let data: User[] = await res.json();

  // client-side filtering
  if (params?.q) {
    const q = params.q.toLowerCase();
    data = data.filter(u => u.name.toLowerCase().includes(q));
  }

  const total = data.length;

  // pagination client-side
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

export async function updateUser(id: string, user: Partial<User>): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  
  if (!res.ok) throw new Error('Failed to update user');
  const updatedUser = await res.json();

  // Update all properties owned by this user if avatar or name changed
  if (user.avatar || user.name) {
    try {
      // Fetch all properties owned by this user
      const propertiesRes = await fetch(`${API_BASE}/properties?ownerId=${id}`, { cache: 'no-store' });
      if (propertiesRes.ok) {
        const properties = await propertiesRes.json();
        
        // Update each property with the new avatar and/or name
        const updatePromises = properties.map((property: Property) =>
          fetch(`${API_BASE}/properties/${property.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...(user.avatar ? { avatar: user.avatar } : {}),
              ...(user.name ? { name: user.name } : {})
            }),
          })
        );
        
        await Promise.all(updatePromises);
      }
    } catch (error) {
      console.error('Failed to update properties:', error);
      // Don't fail the user update if property update fails
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
