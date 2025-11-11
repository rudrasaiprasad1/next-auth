"use client";
import { useState } from "react";

const LoginPage = () => {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleSubmit = () => {
    try {
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
        <h1>Login Page</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="border rounded-lg p-1 w-full"
          required
        />
        <label htmlFor="password">
          <input
            name="password"
            type={!showPassword ? "password" : "text"}
            placeholder="********"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="border rounded-lg p-1 w-full"
            maxLength={16}
            min={8}
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
          SignUP
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
