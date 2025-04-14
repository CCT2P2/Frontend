"use client";

import Link from "next/dist/client/app-dir/link";
import Image from "next/image";
import {useUISettings} from "@/app/store/useUISettings";
import {useState} from "react";
import {motion} from "motion/react"
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SearchIcon, Settings} from "lucide-react"
import {Input} from "@/components/ui/input";

export default function Header() {
    const {blur} = useUISettings();
    return (
        <header
            className={`sticky top-0 z-50 ${blur ? "bg-stone-800/20" : "bg-black"} ${blur ? "backdrop-blur-xl" : ""}`}
        >
            <div className=" p-5 h-16 flex items-center gap-4 relative ml-auto mr-auto max-w-580">
                {/* Logo */}
                <Link href="/login" className="px-4 py-2">
                    <Image
                        src="/GNUF.svg"
                        alt="Home"
                        width={80}
                        height={80}
                    />
                </Link>

                {/* Login + Feedback */}
                <ul className="flex gap-2 items-center">
                    <NavItem linkText={"Home"} linkHref={"/home"}/>
                    <NavItem linkText={"Feedback"} linkHref={"/feedback"}/>
                </ul>

                {/* Centered Search Bar */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
                    <div className={"w-full z-10 px-2"}>
                        <Input
                            className={"w-full pl-10 peer z-20 rounded-2xl outline-none focus:border-primary" +
                                " focus:faint-glow-secondary"}
                            placeholder={"search"}
                        />
                        <SearchIcon
                            className="absolute left-6 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-secondary transition-all duration-200"/>
                    </div>
                </div>

                {/* Profile */}
                <div className="flex gap-6 items-center ml-auto">
                    <Link href={"/settings"}>
                        <Settings className={"size-6 hover:text-secondary transition-all duration-200"}/>
                    </Link>
                    <Link href="/user/1">
                        <Avatar className={"w-10 h-10"}>
                            <AvatarImage src={"/example_pfp.jpg"} alt={"User"}/>
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </div>
        </header>
    );
}

function NavItem({linkText, linkHref}: { linkText: string; linkHref: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={""}
        >
            <Link href={linkHref}
                  className={`relative py-2 px-2 font-semibold mx-2 peer hover:text-secondary transition-all duration-300`}>
                {linkText}
                <motion.span
                    className={cn("absolute bottom-0 left-0 h-0.5 bg-secondary rounded-xl transition-shadow" +
                        " light-glow-black duration-200", isHovered && "light-glow-primary")}
                    initial={{width: '0%', left: '50%'}}
                    animate={isHovered ? {width: '100%', left: '0%'} : {width: '0%', left: '50%'}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                />
            </Link>
        </li>
    );
};