const API = "http://localhost:3001/favorites";

export async function getFavorites(userId: string) {
  const res = await fetch(`${API}?userId=${userId}`);
  return res.json();
}

export async function addFavorite(data: any) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function removeFavorite(id: string) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}

export async function isFavorited(userId: string, propertyId: string) {
  const res = await fetch(
    `${API}?userId=${userId}&propertyId=${propertyId}`
  );
  const data = await res.json();
  return data[0] || null;
}
