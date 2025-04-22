"use client";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layouts/header";

export default function AboutPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="shadow">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<Link href="/forum/0" className="inline-flex items-center">
						<Image src="/GNUF.svg" alt="Home" width={60} height={60} />
					</Link>
					<nav className="space-x-4">
						<a href="/login" className="text-gray-600 hover:text-gray-800">
							Sign In
						</a>
						<a href="/register" className="text-gray-600 hover:text-gray-800">
							Register
						</a>
						<a href="/about" className="text-gray-600 hover:text-gray-800">
							About Us
						</a>
						<a
							href="https://github.com/gnuf"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center text-gray-600 hover:text-gray-800"
						></a>
					</nav>
				</div>
			</header>
			)
			<main className="flex flex-1 justify-center px-6 my-10">
				<div className="flex flex-col items-center justify-center w-full">
					<Card className="w-[50%] max-w-500 border-transparent bg-transparent h-[50%] -mt-50">
						<CardTitle>About</CardTitle>
						<h1>Welcome to Gnu Forum</h1>
						This platform is the result of a semester project created by six
						dedicated students studying Cyber and Computer Engineering at
						Aalborg University, currently in our second semester. What started
						as a school assignment quickly turned into a passion project, driven
						by our shared interest in technology and innovation. We are not just
						students we’re tech enthusiasts who enjoy coding in our free time,
						exploring new tools, and building things from scratch. That passion
						inspired us to develop a platform where people like us can connect,
						share ideas, and discuss everything from code to creativity. Our
						goal was to create a functional and user-friendly platform, where we
						had full control over the entire build. We chose to build the site
						from scratch without using pre-made templates or heavy frameworks.
						Everything you see from backend logic to frontend design has been
						carefully crafted by us, giving us a deeper understanding of how all
						the different parts work together to create a cohesive experience.
						During the project, we worked through challenges as a team
						debugging, testing, and improving every part together. It taught us
						a lot about collaboration and how small details matter in user
						experience. This website represents our teamwork, creativity, and
						learning throughout the semester. We hope it inspires others just as
						much as we enjoyed making it.
						<p>
							— Build with dedication, blood, sweat and tears by students at
							Aalborg University
						</p>
					</Card>
				</div>
			</main>
			<footer className="">
				<div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
					© {new Date().getFullYear()} GNUF. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
