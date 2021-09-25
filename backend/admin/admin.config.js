module.exports = {
  webpack: (config, webpack) => {
    // Add environment variables using the DefinePlugin function
    config.plugins.push(
      new webpack.DefinePlugin({
        CLIENT_FRONTEND_URL: JSON.stringify(process.env.CLIENT_FRONTEND_URL),
        CLIENT_PREVIEW_SECRET: JSON.stringify(
          process.env.CLIENT_PREVIEW_SECRET
        ),
      })
    );
    return config;
  },
};
