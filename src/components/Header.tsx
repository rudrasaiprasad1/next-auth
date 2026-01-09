"use client";
import Link from "next/link";
import { useAuthStore } from "../hook/useAuthStore";
// import axios from "axios";
// import { useEffect, useState } from "react";

export const Header = () => {
  const { isAuthenticated } = useAuthStore();
  // const [data, setData] = useState<any | null>(null);

  // const getDetails = async () => {
  //   try {
  //     const data = await axios.get("/api/users/me");
  //     setData(data.data.data);
  //     console.table(data);
  //     if (data.status === 200) {
  //       setIsLogin(true);
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       throw new Error(error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getDetails();
  // }, [data]);
  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Section  */}
          <div className="flex">
            <Link href="/" className="text-2xl font-bold">
              Ecommerce App
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-10 text-lg">
            <Link
              href="services"
              className="hover:text-gray-300 transition-all"
            >
              Services
            </Link>
            <Link href="about" className="hover:text-gray-300 transition-all">
              About Us
            </Link>
            <Link href="contact" className="hover:text-gray-300 transition-all">
              Contact
            </Link>
            {isAuthenticated ? (
              <Link
                href="/signin"
                className="block text-lg p-1 rounded-lg bg-red-500 text-white hover:text-gray-300 transition-all"
              >
                Logout
              </Link>
            ) : null}
          </nav>

          {/* Call-to-Action Button */}
          <div className="hidden md:block">
            <Link
              href="https://rsp25.netlify.app/"
              target="_blank"
              className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-full text-lg transition-all"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button (for smaller screens)  */}
          <div className="md:hidden flex items-center">
            <button id="menu-button" className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu  */}
        <div id="mobile-menu" className="md:hidden mt-5 hidden space-y-4">
          <Link
            href="home"
            className="block text-lg hover:text-gray-300 transition-all"
          >
            Home
          </Link>
          <Link
            href="services"
            className="block text-lg hover:text-gray-300 transition-all"
          >
            Services
          </Link>
          <Link
            href="about"
            className="block text-lg hover:text-gray-300 transition-all"
          >
            About Us
          </Link>

          <Link
            href="contact"
            className="block text-lg hover:text-gray-300 transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};
