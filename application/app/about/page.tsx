"use client";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
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
        <div className="flex flex-col items-center justify-center w-full">
          <Card className="w-[50%] max-w-500 border-transparent bg-transparent h-[50%] -mt-50">
            <CardTitle>About</CardTitle>
            <h1>Welcome to Gnu Forum</h1>
            Gnu Forum is a lightweight, scalable discussion platform built
            entirely from scratch as part of our second-term Bachelor's project
            in Cyber- and Computer Engineering at Aalborg University. Our goal
            was simple: create a modern forum system that is fast, efficient,
            and easy to scale — without relying on bloated frameworks or
            pre-made solutions. Every line of code in Gnu Forum has been written
            by us. From the database architecture and backend API to the
            frontend interface, we designed, built, and optimized the platform
            ourselves. Our backend is powered by C# with direct SQL access and
            Entity Framework Core integration. On the frontend, we use
            TypeScript to deliver a fast and responsive user experience. All
            data is stored in a lightweight SQLite database, fine-tuned for
            performance and stability. Although Gnu Forum was initially
            developed to support a modest user base, we engineered it with
            scalability in mind. Our system is fully containerized and can be
            deployed on Kubernetes clusters, ensuring it can grow alongside user
            demand. This project represents not just a forum — but the result of
            months of collaboration, learning, and dedication. We hope you enjoy
            using Gnu Forum as much as we enjoyed building it.
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
