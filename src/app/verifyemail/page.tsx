"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // 1️⃣ Initialize token without useEffect → warning gone ✔
  const [token] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("token") || "";
    }
    return "";
  });

  // 2️⃣ Only verification happens in effect
  useEffect(() => {
    if (!token) return;

    const verifyUser = async () => {
      try {
        setStatus("loading");
        await axios.post("/api/users/verifyemail", { token });
        setStatus("success");
        router.push("/login");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-amber-300 text-3xl mb-4">Verify Email</h1>

      {/* <p className="text-gray-500 text-sm mb-4">
        {token ? `Token: ${token}` : "No token found"}
      </p> */}

      {status === "loading" && (
        <div className="text-blue-500 animate-pulse">Verifying...</div>
      )}
      {status === "success" && (
        <div className="text-green-600 px-4 py-2 rounded">
          Email Verified Successfully 🎉
          <br />
          <Link href="/login" className="text-blue-400 underline block mt-2">
            Login
          </Link>
        </div>
      )}
      {status === "error" && (
        <div className="text-red-600 px-4 py-2 rounded">
          Invalid or Expired Token ❌
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
