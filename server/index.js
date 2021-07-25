import { ApolloServer } from "apollo-server";
import { PubSub } from "graphql-subscriptions";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const pubsub = new PubSub();

// starting server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

// connecting db with server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running on ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
