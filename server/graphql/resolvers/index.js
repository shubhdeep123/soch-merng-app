import { postResolvers } from "./postsResolvers.js";
import { userResolvers } from "./usersResolvers.js";

export const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
