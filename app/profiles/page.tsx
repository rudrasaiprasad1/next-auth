"use client ";

import Link from "next/link";

const ProfilePage = () => {
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <div className="flex flex-col items-center align-middle justify-center inset-0 gap-3">
        <h1 className="text-3xl">Login</h1>

        <button type="submit" className="border rounded-lg p-1 w-full ">
          Login
        </button>
        <Link className="text-blue-600" href={"/signup"}>
          go to signup page
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
