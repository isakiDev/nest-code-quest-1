import * as Joi from 'joi'

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),

  DC_SERVER_ID: Joi.string().required(),
  DC_CLIENT_ID: Joi.string().required(),
  DC_CLIENT_SECRET: Joi.string().required(),
  DC_CALLBACK_URL: Joi.string().required(),
  DC_SCOPE: Joi.string().required(),

  JWT_SECRET: Joi.string().required()
})
