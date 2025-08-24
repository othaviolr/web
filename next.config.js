/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "down-br.img.susercontent.com", // Shopee
      "http2.mlstatic.com", // Mercado Livre
      "images.tcdn.com.br", // Toda Casa
      "cdn.awsli.com.br", // AWS LI
      "cdn.leroymerlin.com.br", // Leroy Merlin
      "static.wixstatic.com", // Wix
      "m.media-amazon.com", // Amazon
      "a-static.mlcdn.com.br", // Mercado Livre
      "chilflor.com.br", // Chilflor
      "agromania.cdn.magazord.com.br", // Agromania
      "assets.tramontina.com.br", // Tramontina
      "blog.leroymerlin.com.br", // Blog Leroy Merlin
      "i.etsystatic.com", // Etsy
      "seedfella.com", // Seedfella
      "cf.shopee.com.br", // Shopee CDN
    ],
  },
};

module.exports = nextConfig;
