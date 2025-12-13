import { RegisterFormData, LoginFormData, User } from '../../types/auth';
import bcrypt from 'bcryptjs';
import { setCookie, getCookie, deleteCookie } from '../utils/cookie';

const API_BASE = process.env.JSON_SERVER_URL || 'http://localhost:3001';

function createFakeToken(payload: { id: number; email: string; role: string; name: string; exp: number }) {
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
    body: JSON.stringify({ ...form, password: hashed , status: 'active' }),
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

export function getCurrentUser(): { id: number; name: string; email: string; role: string } | null {
  const v = localStorage.getItem('authUser');
  if (!v) return null;
  try {
    return JSON.parse(v);
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
