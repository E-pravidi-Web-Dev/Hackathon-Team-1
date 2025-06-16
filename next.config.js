/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    },
    // Ensure proper handling of API routes
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ];
    },
};

module.exports = nextConfig; 