"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Toast from "@/components/toast";

type LoginForm = {
  phone: string;
  password: string;
  path: string;
};

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [path, setPath] = useState("e-learning");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    setError("");
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "auth/login";

    const formData: LoginForm = { phone, password, path };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.status) {
      Cookies.set("token", data.data.token, { path: "/" });
      Cookies.set("name", data.data.name, { path: "/" });
      setToastMessage(data.message || "Login successful!");
      setToastType("success");
      setIsToastVisible(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      setError(data.message || "Login failed");
      setToastMessage(data.message || "Login failed. Invalid credentials.");
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone:
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md "
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password:
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full h-12 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md pr-10"
              />
              <div
                className="absolute top-11 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 text-center">{error}</div>}

          <div className="text-center">
            <button
              type="submit"
              className="group relative w-[100px] py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-yellow-600 "
            >
              Login
            </button>
            <div className="text-sm mt-4 text-gray-600">
              <p>
                Dont't have an account ?{" "}
                <span className="hover:underline text-yellow-600">Sign in</span>
              </p>
            </div>
          </div>
        </form>
      </div>
      {isToastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </div>
  );
}
