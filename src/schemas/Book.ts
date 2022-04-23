import { Field, ID, ObjectType } from "type-graphql";
import Author = require("./Author");

@ObjectType()
class Book {
@Field(() => ID)
  id: string;

@Field()
  name: string;

// @Field(() => [Author])
//   authors: Author[];
}

export = Book;
