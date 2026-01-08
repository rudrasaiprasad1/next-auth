export interface IUser {
  _id: string;
  userName: string;
  email: string;

  fullName?: string;
  avatar?: string;
  phone?: string;

  role: "USER" | "ADMIN" | "MODERATOR";
  isVerified: boolean;
  isActive: boolean;

  lastLogin?: string;
  loginCount: number;

  createdAt: string;
  updatedAt: string;
}
