const config = {
  port: process.env.PORT || 4000,
  accessKey: process.env.ACCESS_KEY,
  refreshKey: process.env.REFRESH_KEY,
  accessTokenAge: process.env.ACCESS_TOKEN_AGE || "15m",
};

export default config;
