import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                // Exclude auth routes from being rewritten
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
                has: [
                    {
                        type: "header",
                        key: "exclude-rewrite",
                        value: "true",
                    },
                ],
            },
            {
                // Explicitly exclude auth routes from the rewrite
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*",
            },
            {
                // Handle all other API routes
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
                has: [
                    {
                        type: "header",
                        key: "exclude-rewrite",
                        value: "false",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
