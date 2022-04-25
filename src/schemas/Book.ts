import { Field, ID, InputType, ObjectType } from "type-graphql";
import Author from "./Author.js";

@ObjectType()
export default class Book {
@Field(() => ID, { nullable: false })
  id: string;

@Field({ nullable: false })
  title: string;

@Field(() => [Author], { nullable: true })
  authors: Author[];
}

@InputType()
export class NewBookInput {
@Field({ nullable: false })
  title: string;

@Field(() => [String], { nullable: false })
  authors: string[];
}
