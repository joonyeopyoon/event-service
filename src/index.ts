import mongoose from "mongoose";
import { server } from "./server";
import { natsWrapper } from "./nats-wrapper";
import { dbConnection } from "@databases";
import * as EventListener from "./message/listeners";
import {
  PORT,
  NODE_ENV,
  NATS_URL,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
} from "@config";

const start = async () => {
  try {
    console.log(`NODE_ENV: ${NODE_ENV}`);

    if (NATS_CLUSTER_ID && NATS_CLIENT_ID && NATS_URL) {
      let retryCount = 0,
        retryInterval: any;
      const retryLimit = NODE_ENV === "local" ? 10 : 0;
      await new Promise<void>((resolve, reject) => {
        retryInterval = setInterval(async () => {
          try {
            await natsWrapper.connect(
              NATS_CLUSTER_ID,
              NATS_CLIENT_ID,
              NATS_URL
            );
            clearInterval(retryInterval);
            resolve();
          } catch (err) {
            retryCount++;
            if (retryCount > retryLimit) {
              clearInterval(retryInterval);
              reject(err);
            } else {
              console.log(
                `retrying NATS connection (${retryCount}/${retryLimit})`
              );
            }
          }
        }, 10000);
      });

      natsWrapper.client.on("close", () => {
        console.log("NATS connection closed");
        console.log("=====process exiting, close======");
        process.exit();
      });
      natsWrapper.client.on("disconnect", () => {
        console.log("NATS connection closed");
        console.log("=====process exiting, disconnect======");
        process.exit();
      });
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());

      new EventListener.Event_created(natsWrapper).listen();

      mongoose.connect(dbConnection.url, dbConnection.options);
      console.log("✓ connected to MongoDB");
    }
  } catch (error) {
    console.error(error);
    console.log("=====process exiting, error======");
    process.exit();
  }

  server(PORT);
};

start();
