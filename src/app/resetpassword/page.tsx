import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // 1️⃣ Initialize token without useEffect → warning gone ✔
  const [token] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("token") || "";
    }
    return "";
  });

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
  // const [disablled, setDisablled] = useState<boolean>(false);
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

  // 2️⃣ Only verification happens in effect
  useEffect(() => {
    if (!token) return;

    const verifyUser = async () => {
      try {
        setStatus("loading");
        await axios.post("/api/users/verifyemail", { token });
        setStatus("success");
        router.push("/login");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyUser();
  }, [token]);
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-amber-300 text-3xl mb-4">Reset Password</h1>

      {status === "loading" && (
        <div className="text-blue-500 animate-pulse">Verifying...</div>
      )}
      {status === "success" && (
        <div className="text-green-600 px-4 py-2 rounded">
          Email Verified Successfully
          <br />
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
        </div>
      )}
      {status === "error" && (
        <div className="text-red-600 px-4 py-2 rounded">
          Invalid or Expired Token ❌
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
