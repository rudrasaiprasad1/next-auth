"use client";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  // useEffect
  useState,
} from "react";
import toast from "react-hot-toast";
// axios.defaults.withCredentials = true; // ⭐ important
const LoginPage = () => {
  const [data, setUser] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Validate();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", data);
      console.log(response.data);
      router.replace("/profile");
      toast.success("successfully login !!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data?.error}`); //axios error
      }
      // setError(error as string);
    } finally {
      setLoading(false);
      setUser({ email: "", password: "" });
    }
  };

  const Validate = () => {
    if (data.email === "" || data.password === "") {
      toast.error("All fields are required");
      return false;
    }

    if (data.password.length < 8 || data.password.length > 16) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {error === "" ? null : (
        <div className="gap-3 border-2 border-red-500  p-2 rounded-lg bg-red-200/50 text-red-900 z-10">
          {`${error}`}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center align-middle justify-center inset-0 gap-3 border p-6 rounded-lg bg-gray-800 text-white z-10"
      >
        <h1 className="text-3xl">Login</h1>
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
            className="border rounded-lg p-1 w-full"
            autoComplete={"true"}
            minLength={8}
            maxLength={16}
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
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link className="text-blue-600" href={"/signup"}>
          go to signup page
        </Link>
        <Link className="text-blue-600" href={"/forgotpassword"}>
          forgot password
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
