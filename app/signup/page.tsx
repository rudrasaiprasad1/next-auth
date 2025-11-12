"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [data, setUser] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSubmit = () => {
    try {
      // axios;
      // api
      //   const response = fetch("http://localhost:3000/api/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.name} : ${error.message}`);
      }
    }
  };
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center align-middle justify-center inset-0 gap-3"
      >
        <h1 className="text-3xl">SignUp</h1>
        <label htmlFor="email" className="w-full">
          User Name
          <input
            type="text"
            name="username"
            placeholder="Enter User Name"
            value={data.username}
            onChange={(e) => setUser({ ...data, username: e.target.value })}
            className="border rounded-lg p-1 w-full"
            required
          />
        </label>
        <label htmlFor="email" className="w-full">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={(e) => setUser({ ...data, email: e.target.value })}
            className="border rounded-lg p-1 w-full"
            required
          />
        </label>
        <label htmlFor="password" className="w-full">
          Password
          <input
            name="password"
            type={!showPassword ? "password" : "text"}
            placeholder="********"
            value={data.password}
            onChange={(e) => setUser({ ...data, password: e.target.value })}
            className="border rounded-lg p-1 w-full placeholder:items-center"
            maxLength={16}
            minLength={8}
            required
          />
          <button
            className="text-blue-600"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {!showPassword ? `show` : "hide"}
          </button>
        </label>
        <button type="submit" className="border rounded-lg p-1 w-full ">
          SignUp
        </button>
        <Link className="text-blue-600" href={"/login"}>
          already user login
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
