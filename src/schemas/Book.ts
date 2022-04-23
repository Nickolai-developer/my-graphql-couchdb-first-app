import { Field, ID, ObjectType } from "type-graphql";
import Author from "./Author";

@ObjectType()
export default class Book {
@Field(() => ID)
  id: string;

@Field()
  name: string;

@Field(() => [Author])
  authors: Author[];
}
