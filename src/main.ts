import "reflect-metadata";
import express = require("express");
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import AuthorResolver = require("./controllers/AuthorResolver");
import BookResolver = require("./controllers/BookResolver");

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
