import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                // Exclude auth routes from being rewritten
                source: "/api/:path*",
                destination: `${process.env.API_URL}/api/:path*`,
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
                destination: `${process.env.API_URL}/api/:path*`,
            },
        ];
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '5000',
            pathname: '/images/**',
        },]
    }
};

export default nextConfig;
