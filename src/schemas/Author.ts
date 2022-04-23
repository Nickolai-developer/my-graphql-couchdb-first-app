import { Field, ID, ObjectType } from "type-graphql";
import Book = require("./Book");

@ObjectType()
class Author {
@Field(() => ID)
  id: string;

@Field()
  name: string;

// @Field(() => [Book])
//   books: Book[];
}

export = Author;
