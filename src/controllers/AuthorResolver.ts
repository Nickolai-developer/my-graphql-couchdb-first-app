import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { authorById, booksByAuthor } from "../models/DatabaseService.js";
import { AuthorData, BookData } from "../outerTypes";
import Author from "../schemas/Author.js";
import { ListingInput, SearchInput } from "../schemas/UtilClasses.js";

@Resolver(() => Author)
export default class AuthorResolver {
  @Query(() => Author, { nullable: true })
  async authorById(@Arg("id", { nullable: false }) id: string): Promise<AuthorData | null> {
    return await authorById(id);
  }

  @Query(() => [Author], { nullable: false })
  async getAuthors(@Arg("listingInput", { nullable:false }) { count, skip }: ListingInput): Promise<AuthorData[]> {
    return [];
  }

  @Query(() => [Author], { nullable: true })
  async searchAuthors(@Arg("searchInput", { nullable: false }) { type, searchString }: SearchInput): Promise<AuthorData[]> {
    return [];
  }

  @FieldResolver()
  async books(@Root() { id }: AuthorData): Promise<BookData[]> {
    return await booksByAuthor(id);
  }
}
