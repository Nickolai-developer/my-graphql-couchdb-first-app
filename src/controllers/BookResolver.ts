import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { addBook, bookById } from "../models/DatabaseService.js";
import { BookData } from "../outerTypes";
import Book, { NewBookInput } from "../schemas/Book.js";
import { ListingInput, SearchInput } from "../schemas/UtilClasses.js";

@Resolver(() => Book)
export default class BookResolver {
  @Query(() => Book, { nullable: true })
  async bookById(@Arg("id", { nullable: false }) id: string): Promise<BookData> {
    return await bookById(id);
  }

  @Mutation(() => Book, { nullable: false })
  async addBook(@Arg("newBookInput", { nullable: false }) { title, authors }: NewBookInput): Promise<BookData> {
    const bewBook = await addBook({ title, authors });
    return bewBook;
  }

  @Query(() => [Book], { nullable: false })
  async getBooks(@Arg("listingInput", { nullable: false }) { count, skip }: ListingInput): Promise<BookData[]> {
    return [];
  }

  @Query(() => [Book], { nullable: false })
  async searchBooks(@Arg("searchInput", { nullable:false }) { type, searchString }: SearchInput): Promise<BookData[]> {
    return [];
  }
}
