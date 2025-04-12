"use client";

import Link from "next/dist/client/app-dir/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useUISettings } from "@/app/store/useUISettings";

export default function Header() {
  const { blur } = useUISettings();
  return (
    <header
      className={`sticky top-1 z-50 ${blur ? "bg-stone-800/20" : "bg-black"} ${blur ? "backdrop-blur-xl" : ""}`}
    >
      <div className=" p-5 h-16 flex items-center gap-4 relative ml-auto mr-auto max-w-580">
        {/* Logo */}
        <Link href="/login" className="px-4 py-2">
          <Image
            src="/GNUF.svg"
            alt="Home"
            width={80}
            height={80}
            className="hover:scale-115 transition-transform duration-200"
          />
        </Link>

        {/* Login + Feedback */}
        <div className="flex gap-2 items-center">
          <Card
            className={`${blur ? "bg-stone-800/20" : "bg-black"} border-secondary px-3 py-2 text-sm hover:scale-110 transition-transform duration-200`}
          >
            <Link href="/home">Home</Link>
          </Card>
          <Card
            className={`${blur ? "bg-stone-800/20" : "bg-black"} border-secondary px-3 py-2 text-sm hover:scale-110 transition-transform duration-200`}
          >
            <Link href="/feedback">Feedback</Link>
          </Card>
        </div>

        {/* Centered Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
          <Card
            className={`${blur ? "bg-stone-800/20" : "bg-black"} border-secondary px-3 py-2 text-sm w-full hover:scale-102 transition-transform duration-200`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none px-3 py-2 text-sm placeholder:text-gray-400"
            />
          </Card>
        </div>

        {/* Profile */}
        <div className="flex gap-2 items-center ml-auto">
          <Card
            className={`bg-transparent border-transparent px-3 py-2 text-sm hover:scale-110 transition-transform duration-200`}
          >
            <Link href="/settings">
              <span style={{ fontSize: "1.5rem" }}>⚙️</span>
            </Link>
          </Card>
          <Link href="/user/1">
            <Image
              src="/example_pfp.jpg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full hover:scale-115 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
