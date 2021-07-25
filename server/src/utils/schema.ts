import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./constants";

const resolverPath: [string] = __prod__
  ? [__dirname + "/../resolvers/**/*.resolver.js"]
  : [__dirname + "/../resolvers/**/*.resolver.ts"];

const Schema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: resolverPath,
  });
};

export default Schema;
