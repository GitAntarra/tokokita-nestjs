import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const EnvConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.${process.env.stage}`],
  validationSchema: Joi.object({
    APP_PORT: Joi.number().default(3001).required(),
    DB_HOST: Joi.string().default('localhost').required(),
    DB_PORT: Joi.number().default(3306).required(),
    DB_USER: Joi.string().default('root').required(),
    DB_PASS: Joi.string().default('').required(),
    DB_NAME: Joi.string().required(),
    JWT_KEY: Joi.string().required(),
    JWT_EXP: Joi.string().required(),
    HASH_KEY: Joi.string().required(),
  }),
});
