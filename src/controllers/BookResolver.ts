import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { addBook, bookById, getBooks, searchBooks } from "../models/DatabaseService.js";
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
    return await addBook({ title, authors });
  }

  @Query(() => [Book], { nullable: false })
  async getBooks(@Arg("listingInput", { nullable: false }) listingInput: ListingInput): Promise<BookData[]> {
    return await getBooks(listingInput);
  }

  @Query(() => [Book], { nullable: false })
  async searchBooks(@Arg("searchInput", { nullable:false }) searchInput: SearchInput): Promise<BookData[]> {
    return await searchBooks(searchInput);
  }
}
