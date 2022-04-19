import express = require("express");
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

// only two models, so I'm going to build it from string
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => "Hello World!" };
const app = express();
app.use("/gpq", graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("localhost:4000/gpq"));
