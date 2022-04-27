import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import BookResolver from "./controllers/BookResolver.js";
import AuthorResolver from "./controllers/AuthorResolver.js";

async function app(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [BookResolver, AuthorResolver],
    emitSchemaFile: true
  });
  const server = express();
  server.use("/gpq", graphqlHTTP({
    schema,
    graphiql: true
  }));
  server.listen(4000, () => console.log("Server listening on http://localhost:4000/gpq"));
}

app();
