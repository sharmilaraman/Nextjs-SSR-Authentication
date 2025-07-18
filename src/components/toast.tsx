"use client";
import React, { useEffect } from "react";
import { CircleAlert, CircleCheck, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed w-auto text-white h-auto top-5 right-5 px-4 py-2 rounded shadow transition-all z-50 bg-[#6F6F77] flex items-center"
    >
      {type === "success" ? (
        <CircleCheck  className="h-5 w-5 rounded-full bg-green-400 mr-2" />
      ) : (
       
         <CircleAlert className="h-5 w-5 text-red-400 mr-2" />
        
      )}
      <span>{message}</span>
      <X
        className="h-4 w-4 ml-3 cursor-pointer text-white hover:text-gray-300"
        onClick={onClose}
      />
    </div>
  );
};

export default Toast;