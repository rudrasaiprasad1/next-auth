"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [data, setData] = useState<any | null>(null);
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

  const getDetails = async () => {
    try {
      const data = await axios.get("/api/users/me");
      setData(data.data.data);
      console.table(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <div className="flex flex-col items-center align-middle justify-center inset-0 gap-3">
        <h1 className="text-3xl">Profiles page </h1>

        <button
          type="submit"
          onClick={() => getDetails()}
          className="border rounded-lg p-1 w-full "
        >
          {/* {data !== null ? data : "nothing"} */}
          get User Data
        </button>
        {/* <div>{`${data.email}`}</div> */}

        <Link
          href={`/profile/${data?._id}`}
          className="bg-amber-400 text-black p-1 rounded-2xl"
        >
          {data?._id ? (
            <span>
              {data?._id}:{"profile"}
            </span>
          ) : (
            ""
          )}
        </Link>

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
