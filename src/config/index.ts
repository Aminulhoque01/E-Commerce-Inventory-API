


import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('8080'),
  SOCKET: z.string().default('8082'),
  DATABASE_URL: z.string({
    required_error: 'PostgreSQL URL is required',
  }),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.string().default('1d'),
  JWT_REFRESH_EXPIRATION_TIME: z.string().default('180d'),
  BCRYPT_SALT_ROUNDS: z.string().default('12'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USERNAME: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  BACKEND_IP: z.string().optional(),
  LOCAL_SERVER: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
});

const envVars = envVarsSchema.safeParse(process.env);
if (!envVars.success) {
  throw new Error(`Config validation error: ${JSON.stringify(envVars.error.format())}`);
}

export default {
  env: envVars.data.NODE_ENV,
  port: envVars.data.PORT,
  socket_port: envVars.data.SOCKET,
  database: {
    url: envVars.data.DATABASE_URL,
  },
  jwt: {
    accessSecret: envVars.data.JWT_SECRET,
    accessExpirationTime: envVars.data.JWT_EXPIRATION_TIME,
    refreshExpirationTime: envVars.data.JWT_REFRESH_EXPIRATION_TIME,
  },
  bcrypt: {
    saltRounds: envVars.data.BCRYPT_SALT_ROUNDS,
  },
  email: {
    smtp: {
      host: envVars.data.SMTP_HOST,
      port: envVars.data.SMTP_PORT,
      auth: {
        user: envVars.data.SMTP_USERNAME,
        pass: envVars.data.SMTP_PASSWORD,
      },
    },
    from: envVars.data.EMAIL_FROM,
  },
  backendIp: envVars.data.BACKEND_IP || 'localhost',
  localServer: envVars.data.LOCAL_SERVER,
  stripe: {
    secretKey: envVars.data.STRIPE_SECRET_KEY,
    webhookSecret: envVars.data.STRIPE_WEBHOOK_SECRET,
  },
};
