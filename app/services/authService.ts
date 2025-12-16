import { RegisterFormData, LoginFormData, User } from '../../types/auth';
import bcrypt from 'bcryptjs';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

const API_BASE = process.env.JSON_SERVER_URL || 'http://localhost:3001';

function createFakeToken(payload: { id: string; email: string; role: string; name: string; exp: number }) {
  return btoa(JSON.stringify(payload));
}

export async function register(form: RegisterFormData): Promise<{ user?: User; error?: string }> {
  if (!form.name || !form.email || !form.password) return { error: 'All fields are required' };

  const res = await fetch(`${API_BASE}/users?email=${encodeURIComponent(form.email)}`);
  const existing = await res.json();
  if (existing.length > 0) return { error: 'User already exists' };

  const hashed = await bcrypt.hash(form.password, 10);

  const createRes = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, password: hashed ,status:"active"}),
  });

  if (!createRes.ok) return { error: 'Failed to create user' };

  const user: User = await createRes.json();
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  const token = createFakeToken({ id: user.id, email: user.email, role: user.role, name: user.name, exp });

  setCookie('authToken', token, 1);
  localStorage.setItem('authUser', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));

  return { user };
}

export async function login(form: LoginFormData): Promise<{ user?: User; error?: string }> {
  if (!form.email || !form.password) return { error: 'All fields are required' };

  const res = await fetch(`${API_BASE}/users?email=${encodeURIComponent(form.email)}`);
  if (!res.ok) return { error: 'Network error' };

  const users: User[] = await res.json();
  const user = users[0];
  if (!user) return { error: 'Invalid credentials' };

  const isValid = await bcrypt.compare(form.password, user.password);
  if (!isValid) return { error: 'Invalid credentials' };

  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  const token = createFakeToken({ id: user.id, email: user.email, role: user.role, name: user.name, exp });

  setCookie('authToken', token, 1);
  localStorage.setItem('authUser', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));

  return { user };
}

export function logout() {
  deleteCookie('authToken');
  localStorage.removeItem('authUser');
}

export function getCurrentUser(): User | null {
  const v = localStorage.getItem('authUser');
  if (!v) return null;
  try {
    return JSON.parse(v) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getCookie('authToken');
  const user = getCurrentUser();
  if (!token || !user) return false;

  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      logout();
      return false;
    }
    return decoded.email === user.email;
  } catch {
    return false;
  }
}

export async function updateUser(id: string, data: Partial<User>): Promise<{ user?: User; error?: string }> {
  try {
    // If password is provided, hash it
    let updateData = { ...data };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      console.error('Update failed:', res.status, res.statusText);
      const text = await res.text();
      console.error('Response body:', text);
      return { error: `Failed to update user: ${res.status} ${res.statusText}` };
    }

    const updatedUser: User = await res.json();

    // Update local storage if it's the current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === updatedUser.id) {
      const exp = Math.floor(Date.now() / 1000) + 60 * 60;
      const token = createFakeToken({ 
        id: updatedUser.id, 
        email: updatedUser.email, 
        role: updatedUser.role, 
        name: updatedUser.name, 
        exp 
      });
      
      setCookie('authToken', token, 1);
      localStorage.setItem('authUser', JSON.stringify({ 
        id: updatedUser.id, 
        name: updatedUser.name, 
        email: updatedUser.email, 
        role: updatedUser.role 
      }));
    }

    return { user: updatedUser };
  } catch (error) {
    return { error: 'Network error' };
  }
}
