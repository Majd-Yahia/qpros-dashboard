/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: 'http://localhost:3000',
        ORIGIN: 'http://localhost:3001',
    },
}

module.exports = nextConfig
