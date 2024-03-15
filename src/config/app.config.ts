export const EnvConfiguration = () => ({
  PORT: process.env.PORT,

  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,

  DC_SERVER_ID: process.env.DC_SERVER_ID,
  DC_CLIENT_ID: process.env.DC_CLIENT_ID,
  DC_CLIENT_SECRET: process.env.DC_CLIENT_SECRET,
  DC_CALLBACK_URL: process.env.DC_CALLBACK_URL,
  DC_SCOPE: process.env.DC_SCOPE,

  JWT_SECRET: process.env.JWT_SECRET

})
