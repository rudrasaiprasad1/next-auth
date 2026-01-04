"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const logout = async () => {
    await axios.post("/api/users/logout");
    router.push("/login");
    router.refresh(); // refresh server components
  };

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
