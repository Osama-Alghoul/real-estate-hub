export type Role = 'admin' | 'buyer' | 'owner';
export type Status = 'active' | 'disabled';
export type RegisterableRole = 'buyer' | 'owner';

export interface User {
  id: string;
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
  role: RegisterableRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}