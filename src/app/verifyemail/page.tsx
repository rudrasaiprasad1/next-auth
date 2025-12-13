"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
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
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="border-2 p-6">
        <h1 className="text-amber-300 text-3xl mb-4">Verify Email</h1>

        {status === "loading" && (
          <div className="text-blue-500 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 animate-spin transition-transform duration-500 ease-linear"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Verifying...
          </div>
        )}
        {status === "success" && (
          <div className="text-green-600 px-4 py-2 rounded">
            Email Verified Successfully 🎉
            <br />
            <Link className="relative my-2" href="/login">
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100  hover:text-blue-500 hover:bg-black capitalize">
                {"goto Login page >"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </span>
            </Link>
          </div>
        )}
        {status === "error" && (
          <div className="text-red-600 px-4 py-2 rounded">
            Invalid or Expired Token ❌
            <Link className="relative my-2" href="/signup">
              <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100  hover:text-blue-500 hover:bg-black capitalize">
                <div className="items-center">
                  {"goto signup page >"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </div>
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
