import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers/index.js";
import dotenv from "dotenv";

dotenv.config();

// starting server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running on ${res.url}`);
  });
