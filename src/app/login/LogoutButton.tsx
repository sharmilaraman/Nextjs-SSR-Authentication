"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = Cookies.get("token");
    if (token) {
      await fetch(
        "https://api2-tejasvita-elearning.underdev.in/api/auth/logout",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Cookies.remove("token");
    }
    alert("Do you want to logout?")
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-1 py-1  md:px-4 md:py-2 bg-red-500 text-white rounded flex items-center gap-2"
    >
      <span className="hidden md:inline">Logout</span>
      <LogOut className="w-5 h-5 block md:hidden"/>
    </button>
  );
}
