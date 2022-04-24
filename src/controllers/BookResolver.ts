import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { addBook, bookById } from "../models/DatabaseService";
import { BookData } from "../outerTypes";
import Book, { NewBookInput } from "../schemas/Book";
import { ListingInput, SearchInput } from "../schemas/UtilClasses";

@Resolver(() => Book)
class BookResolver {
  @Query(() => Book, { nullable: true })
  bookById(@Arg("id", { nullable: false }) id: string): BookData {
    return bookById(id);
  }

  @Mutation(() => Book, { nullable: false })
  addBook(@Arg("newBookInput", { nullable: false }) { title, authors }: NewBookInput): BookData {
    const bewBook = addBook({ title, authors });
    return bewBook;
  }

  @Query(() => [Book], { nullable: false })
  getBooks(@Arg("listingInput", { nullable: false }) { count, skip }: ListingInput): BookData[] {
    return [];
  }

  @Query(() => [Book], { nullable: false })
  searchBooks(@Arg("searchInput", { nullable:false }) { type, searchString }: SearchInput): BookData[] {
    return [];
  }
}

export = BookResolver;
