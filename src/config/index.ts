import { config } from "dotenv";
config({ path: `.env.local` });

export const {
  PORT,
  NODE_ENV,
  NATS_URL,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
} = process.env;
