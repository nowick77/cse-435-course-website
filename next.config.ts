/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/cse-435-course-website',
    assetPrefix: '/course-website/',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig