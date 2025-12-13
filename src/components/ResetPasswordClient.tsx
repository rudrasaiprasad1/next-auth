"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [data, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!token) {
    toast.error("Invalid or missing reset token");
    setStatus("error");
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setStatus("loading");

      const res = await axios.post("/api/users/resetpassword", {
        token,
        password: data.password,
      });

      if (res.data.success) {
        toast.success("Password reset successful");
        setStatus("success");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid or expired token");
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-amber-300 text-3xl mb-4">Reset Password</h1>

      {status === "loading" && (
        <div className="text-blue-500 animate-pulse">Verifying...</div>
      )}

      {status === "idle" && (
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-3 bg-black p-4 rounded"
        >
          <label>
            Password
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setUser({ ...data, password: e.target.value })}
              className="border rounded p-1 w-full"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="text-blue-600"
            >
              {showPassword ? "hide" : "show"}
            </button>
          </label>

          <label>
            Confirm Password
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={(e) =>
                setUser({ ...data, confirmPassword: e.target.value })
              }
              className="border rounded p-1 w-full"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowConfirmPassword(!showConfirmPassword);
              }}
              className="text-blue-600"
            >
              {showConfirmPassword ? "hide" : "show"}
            </button>
          </label>

          <button type="submit" className="border rounded p-1">
            Reset Password
          </button>
        </form>
      )}

      {status === "success" && (
        <div className="text-green-600">Password reset successfully 🎉</div>
      )}

      {status === "error" && (
        <div className="text-red-600">Invalid or expired token ❌</div>
      )}
    </div>
  );
};

export default ResetPasswordClient;
