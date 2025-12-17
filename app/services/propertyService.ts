import { Property } from "@/types/property.type";

const API_BASE = process.env.JSON_SERVER_URL || "http://localhost:3001";

// export async function fetchProperties(params?: {
//   q?: string;
//   type?: string;
//   status?: string;
//   _page?: number;
//   _limit?: number;
// }): Promise<{ data: Property[]; total: number }> {
//   const url = new URL(`${API_BASE}/properties`);

//   // If searching, we fetch all and filter client-side to ensure strict title matching
//   // and to avoid json-server version incompatibilities with _like
//   const isSearching = !!params?.q;

//   if (params) {
//     // If NOT searching, apply pagination on server
//     if (!isSearching) {
//       if (params._page) url.searchParams.append('_page', params._page.toString());
//       if (params._limit) url.searchParams.append('_limit', params._limit.toString());
//     }

//     if (params.type && params.type !== 'all') url.searchParams.append('type', params.type);
//     if (params.status && params.status !== 'all') url.searchParams.append('status', params.status);
//   }

//   const res = await fetch(url.toString(), { cache: 'no-store' });
//   if (!res.ok) throw new Error('Failed to fetch properties');

//   let data: Property[] = await res.json();
//   let total = Number(res.headers.get('X-Total-Count') || data.length);

//   if (isSearching && params?.q) {
//     const q = params.q.toLowerCase();
//     data = data.filter(p => p.title.toLowerCase().includes(q));
//     total = data.length;

//     // Manual pagination if needed
//     if (params._page && params._limit) {
//       const start = (params._page - 1) * params._limit;
//       data = data.slice(start, start + params._limit);
//     }
//   }

//   return { data, total };
// }
export async function fetchProperties(params?: {
  q?: string;
  type?: string;
  status?: string;
  ownerId?: string;
  _page?: number;
  _limit?: number;
}): Promise<{ data: Property[]; total: number }> {
  /* 
    Note: json-server supports filtering directly via query params (e.g. ?ownerId=...), 
    but for consistency with the existing pattern of fetching all and filtering (which 
    might be for client-side search/mixed logic), we will add ownerId filtering here.
    Ideally, we would pass params to the URL search params for server-side filtering.
  */

  // Optimization: If ownerId is the ONLY filter (or combined with others),
  // we could theoretically use server-side filtering: fetch(`${API_BASE}/properties?ownerId=${params.ownerId}`)
  // But strictly following the existing pattern of "fetch all then filter":

  const res = await fetch(`${API_BASE}/properties`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch properties");

  let data: Property[] = await res.json();

  if (params?.ownerId) {
    data = data.filter((p) => p.ownerId === params.ownerId);
  }

  if (params?.type && params.type !== "all") {
    data = data.filter((p) => p.type === params.type);
  }
  if (params?.status && params.status !== "all") {
    data = data.filter((p) => p.status === params.status);
  }

  if (params?.q) {
    const q = params.q.toLowerCase();
    data = data.filter((p) => p.title.toLowerCase().includes(q));
  }

  const total = data.length;

  if (params?._page && params?._limit) {
    const start = (params._page - 1) * params._limit;
    data = data.slice(start, start + params._limit);
  }

  return { data, total };
}

async function getUserById(ownerId: string) {
  const res = await fetch(`${API_BASE}/users/${ownerId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function createProperty(
  property: Omit<Property, "id">
): Promise<Property> {
  // Fetch owner's avatar if ownerId is provided
  let ownerData = null;
  if (property.ownerId) {
    ownerData = await getUserById(property.ownerId);
  }

  const res = await fetch(`${API_BASE}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...property,
      avatar: ownerData?.avatar || property.avatar,
      name: ownerData?.name || property.name,
      createdAt: new Date().toISOString(),
      status: property.status || "available",
    }),
  });

  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

export async function updateProperty(
  id: string,
  property: Partial<Property>
): Promise<Property> {
  // Fetch owner's avatar if ownerId is provided
  let ownerData = null;
  if (property.ownerId) {
    ownerData = await getUserById(property.ownerId);
  }

  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...property,
      ...(ownerData ? { avatar: ownerData.avatar, name: ownerData.name } : {}),
    }),
  });

  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

export async function deleteProperty(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/properties/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete property");
}
