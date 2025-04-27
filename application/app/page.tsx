"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LandingPage() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			<header className="shadow">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<Link href="/" className="inline-flex items-center">
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

			<main className="flex flex-1 justify-center px-6 my-10">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-col text-center max-w-xl gap-8"
				>
					<Link
						href="/login"
						className="inline-flex justify-center w-full py-8"
					>
						<Image src="/GNUF.svg" alt="Home" width={200} height={200} />
					</Link>
					<motion.h2
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-4xl font-extrabold text-gray-200 mb-8"
					>
						Welcome to GNUF
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="text-gray-300 mb-8"
					>
						The social media developed by tech enthusiasts for tech enthusiasts,
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<div className="flex flex-row justify-between w-full">
							<Card className="w-[48%] mb-4 border-transparent bg-transparent">
								Gnuf contains [insert amount here] of exiting communities,
								filled to the brim with passionate individuals eager to connect
								and share their knowledge.
							</Card>
							<Card className="w-[48%] mb-4 border-transparent bg-transparent">
								&#34;They say great software is built on the shoulders of
								giants. Not here! At Gnuf we make all our software from scratch.
								No handholding&#34;
								<p>- Cave Gnufson</p>
							</Card>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
						transition={{ duration: 0.5, delay: 1 }}
						className="space-x-4"
					>
						<Button asChild variant="outline" className="text-2xl h-12 w-[75%]">
							<a href="/register">Get Started</a>
						</Button>
						<Button asChild variant="secondary" className="text-sm my-6">
							<a
								href="https://github.com/CCT2P2"
								target="_blank"
								rel="noopener noreferrer"
							>
								View on GitHub
							</a>
						</Button>
					</motion.div>
				</motion.div>
			</main>

			<footer className="">
				<div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
					© {new Date().getFullYear()} GNUF. All rights reserved.
				</div>
			</footer>
		</div>
	);
}
