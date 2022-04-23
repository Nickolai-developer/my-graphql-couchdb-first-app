import { Field, ID, ObjectType } from "type-graphql";
import Book from "./Book";

@ObjectType()
export default class Author {
@Field(() => ID, { nullable: false })
  id: string;

@Field({ nullable: false })
  name: string;

@Field(() => [Book], { nullable: true })
  books: Book[];
}
