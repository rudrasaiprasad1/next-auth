"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token: token,
      });
      // const response = await fetch("/api/users/verifyemail", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token: token }),
      // });
      console.log(response);
      setVerify(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col h-screen justify-center align-middle  items-center inset-0">
      <div>
        <h1 className="text-amber-300 text-3xl">Verify Email</h1>
      </div>
      <div>
        <button>{token ? token : "no token"}</button>
      </div>
      <div>
        {verify ? (
          <>
            <div className="text-white bg-green-500">Email Verified</div>
            <Link href={"/login"} className="text-blue-500">
              Login
            </Link>
          </>
        ) : null}
        {error ? (
          <>
            <div className="text-black bg-red-500 text-2xl capitalize">
              error
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyEmail;
