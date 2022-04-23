import { Arg, Query, Resolver } from "type-graphql";
import { AuthorData } from "../outerTypes";
import Author from "../schemas/Author";

@Resolver(() => Author)
class AuthorResolver {
@Query(() => Author, { nullable: true })
  authorById(@Arg("id", { nullable: false }) id: string): AuthorData {
    return {
      id,
      name: "sampleName"
    };
  }
}

export = AuthorResolver;
