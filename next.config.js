module.exports = {

  async rewrites() {
    return [
      {
        source: '/test/:path*',
        destination: process.env.NEXT_PUBLIC_RENAISSENCE_URL || 'http://192.168.3.28:9211/:path*'  // 要代理到的API
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'app.galxe.com',
        port: '',
        pathname: '/**',
      },
      {
        // https://artela-oss.oss-us-west-1.aliyuncs.com/renaissence/images/swapintro.png
        protocol: 'https',
        hostname: 'artela-oss.oss-us-west-1.aliyuncs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}