"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    email: string;
  }>({
    email: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log(response.data);
      if (response.data.success) {
        toast.success("Password Reset Link Sent Successfully!!");
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.name} : ${error.message}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      {/* <!-- Forgot Password Form Section --> */}
      <section className="w-full max-w-md">
        <div className="rounded-none bg-white p-8 shadow-sm">
          {/* <!-- Header --> */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <svg
                className="h-12 w-12 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-black">
              {` Forgot Password`}
            </h1>
            <p className="text-sm text-gray-600">
              {`Enter your email address and we'll send you a link to reset your
              password.`}
            </p>
          </div>

          {/* <!-- Form --> */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {`Email Address`}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ email: e.target.value })}
                className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              {`Send Reset Link`}
            </button>
          </form>

          {/* <!-- Additional Links --> */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 transition-colors hover:text-black"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
