"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disablled, setDisablled] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/signup", data);
      console.log(response.data);
      router.push("/login");
      toast.success("Registration Successfully!!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.name} : ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (
      data.email.length > 0 &&
      data.password.length > 0 &&
      data.username.length > 0
    ) {
      setDisablled(false);
    } else {
      setDisablled(true);
    }
  }, [data]);
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
