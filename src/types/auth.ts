// types/auth.ts
export type AuthUser = {
  _id: string;
  userName: string;
  email: string;
  fullName?: string;
  avatar?: string;
  phone?: string;

  role: "USER" | "ADMIN" | "MODERATOR";
  isVerified: boolean;
  isActive: boolean;

  createdAt: string;
};
