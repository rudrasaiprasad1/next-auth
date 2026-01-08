"use client";

import { useEffect, useState } from "react";

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

export const useCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Not authenticated");
        }

        setUser(data.user);

        console.table(data.user);
      } catch (err: unknown) {
        setUser(null);
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
