export type Role = 'admin' | 'buyer' | 'owner';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginFormData {
  email: string;
  password: string;
}