import { config } from "dotenv";
config({ path: `.env.local` });

export const { PORT, NODE_ENV, NATS_URL, NATS_CLIENT_ID, NATS_CLUSTER_ID } =
  process.env;
