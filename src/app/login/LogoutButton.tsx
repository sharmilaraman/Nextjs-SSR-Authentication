"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import React, { useState } from "react";
import Toast from "@/components/toast";

export default function LogoutButton() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleLogout = async () => {
    const token = Cookies.get("token");
    try {
      if (token) {
        const res = await fetch(
          "https://api2-tejasvita-elearning.underdev.in/api/auth/logout",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Cookies.remove("token");
        const data = await res.json();
        setToastMessage(data.message || "Logout successful!");
        setToastType("success");
        setIsToastVisible(true);
      } else {
        setToastMessage("No token found. Already logged out.");
        setToastType("error");
        setIsToastVisible(true);
      }
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setToastMessage("Logout failed. Please try again.");
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="px-1 py-1  md:px-4 md:py-2 bg-red-500 text-white rounded flex items-center gap-2"
      >
        <span className="hidden md:inline">Logout</span>
        <LogOut className="w-5 h-5 block md:hidden" />
      </button>
      {isToastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </>
  );
}
