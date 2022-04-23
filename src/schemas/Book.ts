import { Field, ID, ObjectType } from "type-graphql";
import Author from "./Author";

@ObjectType()
export default class Book {
@Field(() => ID, { nullable: false })
  id: string;

@Field({ nullable: false })
  name: string;

@Field(() => [Author], { nullable: true })
  authors: Author[];
}
