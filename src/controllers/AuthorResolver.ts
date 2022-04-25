import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { authorById, booksByAuthor } from "../models/DatabaseService.js";
import { AuthorData, BookData } from "../outerTypes.js";
import Author from "../schemas/Author.js";
import { ListingInput, SearchInput } from "../schemas/UtilClasses.js";

@Resolver(() => Author)
export default class AuthorResolver {
  @Query(() => Author, { nullable: true })
  authorById(@Arg("id", { nullable: false }) id: string): AuthorData | null {
    return authorById(id);
  }

  @Query(() => [Author], { nullable: false })
  getAuthors(@Arg("listingInput", { nullable:false }) { count, skip }: ListingInput): AuthorData[] {
    return [];
  }

  @Query(() => [Author], { nullable: true })
  searchAuthors(@Arg("searchInput", { nullable: false }) { type, searchString }: SearchInput): AuthorData[] {
    return [];
  }

  @FieldResolver()
  books(@Root() { id }: AuthorData): BookData[] {
    return booksByAuthor(id);
  }
}
