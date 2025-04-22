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
						Gnu Forum is a lightweight, scalable discussion platform developed
						as part of our second-term Bachelor’s project in Cyber- and Computer
						Engineering at Aalborg University. Our goal was to design and build
						a modern forum system from the ground up — focusing on efficiency,
						simplicity, and flexibility. While we utilize established frameworks
						such as React, Next.js, TailwindCSS, and .NET, all core application
						logic, database design, and system architecture have been developed
						by us. Gnu Forum features a custom-built backend written in C#,
						combining direct SQL access with Entity Framework Core to interact
						with a lightweight SQLite database. The frontend is implemented with
						TypeScript and React, providing a responsive and user-friendly
						interface. Currently, the system runs directly on bare metal servers
						for maximum performance and simplicity. However, it has been
						designed with scalability in mind and can be containerized for
						future deployment on Kubernetes clusters. This project reflects our
						team's dedication to practical engineering principles — balancing
						academic rigor with real-world considerations like performance,
						maintainability, and scalability. We are proud to share Gnu Forum as
						a result of our collaboration, problem-solving, and commitment to
						building complete systems from first principles.
						<p>— Proudly built by students at Aalborg University. </p>
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
