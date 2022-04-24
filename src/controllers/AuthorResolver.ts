import { Arg, Query, Resolver } from "type-graphql";
import { authorById } from "../models/DatabaseService";
import { AuthorData } from "../outerTypes";
import Author from "../schemas/Author";
import { ListingInput, SearchInput } from "../schemas/UtilClasses";

@Resolver(() => Author)
class AuthorResolver {
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
}

export = AuthorResolver;
