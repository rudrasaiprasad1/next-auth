"use client";
import { useCurrentUser } from "@/src/hook/useCurrenUser";
import Image from "next/image";
import { use, useEffect, useState } from "react";
// import toast from "react-hot-toast";

interface PostPageProps {
  params: Promise<{ id: string }>;
}
export default function ProfileIdPage({ params }: PostPageProps) {
  const { id } = use(params);

  const { user, loading, error } = useCurrentUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // 🔥 Populate form once user loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return null;

  return (
    <div className="w-full">
      {/* <div className="flex h-screen justify-center align-middle  items-center inset-0 ">
        <div className="flex flex-col items-center align-middle justify-center inset-0 gap-3">
          <h1 className="text-3xl bg-amber-500 text-black font-bold rounded-lg p-2">
            {`Profile : ${id}`}
          </h1>

          <button type="submit" className="border rounded-lg p-1 w-full ">
            {`${id}`}
          </button>
        </div>
      </div> */}
      <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
            <h2 className="mb-5 text-4xl font-bold text-blue-900">
              {"Update Profile"}
            </h2>
            <div className="text-center">
              <div>
                <Image
                  src="/products/googel-pixel-9.jpg"
                  alt="Profile Picture"
                  width={280}
                  height={280}
                  className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                />
                <input
                  type="file"
                  name="profile"
                  id="upload_profile"
                  hidden
                  required
                />

                <label
                  htmlFor="upload_profile"
                  className="inline-flex items-center"
                >
                  <svg
                    data-slot="icon"
                    className="w-5 h-5 text-blue-700"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                </label>
              </div>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
                {"Change Profile Picture"}
              </button>
            </div>
          </div>

          {/*  Form  */}
          <form className="space-y-4">
            {/*  İsim ve Unvan  */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {"Name"}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="John Doe"
                value={user?.fullName}
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                {"Title"}
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Software Developer"
              />
            </div>

            {/*  Organizasyon Bilgisi  */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                {"Organization"}
              </label>
              <input
                type="text"
                id="organization"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Estep Bilişim"
              />
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {"Email"}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                {"Phone"}
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                {"Location"}
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="San Francisco, CA"
              />
            </div>

            {/*  Kaydet ve İptal Butonları  */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                {"Cancel"}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
              >
                {"Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
