import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

const stringSchema = readFileSync(
  "${__ dirname}/../src/resolverSchema.graphql",
  {
    encoding: "utf8",
  }
);
const root = require("./resolver");
const schema = makeExecutableSchema({
  typeDefs: stringSchema,
  resolvers: root,
});

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
      rootValue: root,
    })
  );
  app.listen(5000, () => {
    console.log("Server runs on port 5000");
  });
};

main().catch((err) => {
  console.log(err);
});
