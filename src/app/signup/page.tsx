"use client";
import Link from "next/link";
import {
  // useEffect,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [data, setUser] = useState<{
    userName: string;
    email: string;
    password: string;
  }>({
    userName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [disablled, setDisablled] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/signup", data);
      console.log(response.data);

      if (response.data.success) {
        const message: string =
          response.data.message || "Registration Successful!";
        toast.success(message);
        router.push("/login");
        setUser({ userName: "", email: "", password: "" });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data?.error}`);
      }
      setUser({ userName: "", email: "", password: "" });
    } finally {
      setUser({ userName: "", email: "", password: "" });
    }
  };

  const disablled = !data.email || !data.password || !data.userName;
  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center align-middle justify-center inset-0 gap-3 border p-6 rounded-lg bg-gray-800 text-white z-10"
      >
        <h1 className="text-3xl">SignUp</h1>
        <label htmlFor="email" className="w-full">
          Full Name
          <input
            type="text"
            name="userName"
            placeholder="Enter User Name"
            value={data.userName}
            onChange={(e) => setUser({ ...data, userName: e.target.value })}
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
            placeholder="*****************"
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
        <button
          type="submit"
          className="border rounded-lg p-1 w-full "
          disabled={disablled}
        >
          {disablled ? "No SignUp" : "SignUp"}
        </button>
        <Link className="text-blue-600" href={"/login"}>
          already user login
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
