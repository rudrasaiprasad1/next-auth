"use client";
import axios from "axios";
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

  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", data);

      console.log(response.data);

      router.replace("/profile");
      toast.success("successfully login !!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.name} : ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center align-middle justify-center inset-0 gap-3"
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
      </form>
    </div>
  );
};

export default LoginPage;
