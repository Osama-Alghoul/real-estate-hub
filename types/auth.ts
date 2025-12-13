export type Role = 'admin' | 'buyer' | 'owner';
export type Status = 'active' | 'disabled';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: Status;
  createdAt: string;
  avatar?: string;
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