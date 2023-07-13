import express from "express";
import { createServer } from "http";
import { graphqlSchema } from "./graphql";
import { connect, StringCodec } from "nats";
import { execute, subscribe } from "graphql";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ ...graphqlSchema });

const apollo = new ApolloServer({
  schema,
  introspection: true,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  // context: async ({ req }) => {
  //   // @to-do JWT Token parsing 후 유효성 검사
  //   let token = req.headers.authorization || undefined;
  // },
});

export const server = async (port: any) => {
  try {
    await apollo.start();
    apollo.applyMiddleware({ app });

    new SubscriptionServer(
      { execute, subscribe, schema },
      { server: httpServer, path: apollo.graphqlPath }
    );

    httpServer.listen(port, () => {
      console.log(
        `🚀 Event Server ready at http://localhost:${port}${apollo.graphqlPath}`
      );
    });

    /** for "nats" start */
    const nc = await connect();
    const sc = StringCodec();
    const sub = nc.subscribe("meta.>");

    for await (const m of sub) {
      const STREAM_TYPE_INDEX = 1;
      const type = m.subject.split(".")[STREAM_TYPE_INDEX];
      const { mac, dateTime, ...data } = JSON.parse(sc.decode(m.data));

      console.log("log-20230711-start");
      console.log(type, mac, dateTime, { data });
      console.log("log-20230711-end");
    }
    /** for "nats" end */
  } catch (error) {
    await apollo.stop();
    console.error(error);
    throw error;
  }
};
