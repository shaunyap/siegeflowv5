/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@use 'global' as *; @use 'global/variables/colors';`
  },
}

module.exports = nextConfig
