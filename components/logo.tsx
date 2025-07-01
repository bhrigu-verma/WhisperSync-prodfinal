import React from "react";
import { Ear } from "lucide-react"; // You can also use react-icons if you prefer a closer ear symbol

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 flex items-center justify-center">
        <Ear className="w-5 h-5 text-white" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white/70 rounded-full blur-[1px]" />
      </div>
      <span className="text-xl font-extrabold bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
        WHISPRSYNC
      </span>
    </div>
  );
}
