const withImages = require('next-images');
const withVideos = require('next-videos');
const path = require('path');

module.exports = withVideos(withImages({
  env: {
    SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
    WEBSITE_LOCK_PASSWORD: process.env.WEBSITE_LOCK_PASSWORD
  },
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
  fileExtensions: ["jpg", "jpeg", "png", "gif", "webp", "avif"], // Exclude SVG from next-images
  webpack(config) {
    // Remove the existing SVG rule from next-images
    config.module.rules = config.module.rules.map(rule => {
      if (rule.test && rule.test.toString().includes('svg')) {
        return { ...rule, test: /\.(png|jpe?g|gif|webp|avif)$/i };
      }
      return rule;
    });

    // Add @svgr/webpack for handling SVG as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
}));
