"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await fetch("/api/users/logout");
      router.push("/login");
      toast.success("successfully logout !!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <div className="flex flex-col items-center align-middle justify-center inset-0 gap-3">
        <h1 className="text-3xl">Profiles page </h1>

        <button type="submit" className="border rounded-lg p-1 w-full ">
          profile
        </button>
        <button
          className="border rounded-lg p-1 w-full bg-red-600 "
          onClick={logout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
