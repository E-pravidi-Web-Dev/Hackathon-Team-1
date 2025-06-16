/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    // Enable API routes
    api: {
        bodyParser: true,
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