"use client";
import ResetPasswordClient from "@/src/components/ResetPasswordClient";
import { Suspense } from "react";
const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
};

// const ResetPasswordPage = () => {
//   const router = useRouter();
//   const [status, setStatus] = useState<
//     "idle" | "loading" | "success" | "error"
//   >("idle");

//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   const [data, setUser] = useState<{
//     password: string;
//     confirmPassword: string;
//   }>({
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState<boolean>(false);

//   if (!token) {
//     toast.loading("token Recived");
//     setStatus("idle");
//   }

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("loading");
//     try {
//       if (data.confirmPassword !== data.password) {
//         setStatus("error");
//         toast.error("password not match");
//         return;
//       }

//       const res = await axios.post("/api/users/resetpassword", {
//         token,
//         password: data.password,
//       });

//       if (res.data.success) {
//         setStatus("success");
//         router.push("/login");
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus("error");
//     }
//   };
//   return (
//     <div className="flex flex-col h-screen justify-center items-center">
//       <h1 className="text-amber-300 text-3xl mb-4">Reset Password</h1>

//       {status === "loading" && (
//         <div className="text-blue-500 animate-pulse">Verifying...</div>
//       )}
//       {status === "idle" && (
//         <div className="text-white bg-black px-4 py-2 rounded">
//           <br />
//           <form
//             onSubmit={handleResetPassword}
//             className="flex flex-col items-center align-middle justify-center inset-0 gap-3"
//           >
//             <label htmlFor="password" className="w-full">
//               Password
//               <input
//                 name="password"
//                 type={!showPassword ? "password" : "text"}
//                 placeholder="*****************"
//                 value={data.password}
//                 onChange={(e) => setUser({ ...data, password: e.target.value })}
//                 className="border rounded-lg p-1 w-full placeholder:items-center"
//                 maxLength={16}
//                 minLength={8}
//                 required
//               />
//               <button
//                 className="text-blue-600"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowPassword(!showPassword);
//                 }}
//               >
//                 {!showPassword ? `show` : "hide"}
//               </button>
//             </label>
//             <label htmlFor="confirmPassword" className="w-full">
//               Confirm Password
//               <input
//                 name="confirmPassword"
//                 type={!showConfirmPassword ? "password" : "text"}
//                 placeholder="*****************"
//                 value={data.confirmPassword}
//                 onChange={(e) =>
//                   setUser({ ...data, confirmPassword: e.target.value })
//                 }
//                 className="border rounded-lg p-1 w-full placeholder:items-center"
//                 maxLength={16}
//                 minLength={8}
//                 required
//               />
//               <button
//                 className="text-blue-600"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowConfirmPassword(!showConfirmPassword);
//                 }}
//               >
//                 {!showConfirmPassword ? `show` : "hide"}
//               </button>
//             </label>
//             <button type="submit" className="border rounded-lg p-1 w-full ">
//               {"Reset Password"}
//             </button>
//           </form>
//         </div>
//       )}
//       {status === "success" && (
//         <div className="text-green-600 px-4 py-2 rounded">
//           Password Reset Successfully 🎉
//         </div>
//       )}
//       {status === "error" && (
//         <div className="text-red-600 px-4 py-2 rounded">
//           Invalid or Expired Token ❌
//         </div>
//       )}
//     </div>
//   );
// };

export default ResetPasswordPage;
