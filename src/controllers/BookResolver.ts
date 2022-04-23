import { Arg, Query, Resolver } from "type-graphql";
import { BookData } from "../outerTypes";
import Book = require("../schemas/Book");

@Resolver(() => Book)
class BookResolver {
@Query(() => Book, { nullable: true })
  bookById(@Arg("id", { nullable: false }) id: string): BookData {
    return {
      id: id,
      name: "sampleName"
    };
  }
// @Mutation()
}

export = BookResolver;
