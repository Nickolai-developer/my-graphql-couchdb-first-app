import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ListingInput {
@Field(() => Int, { nullable: false })
  count: number;

@Field(() => Int, { nullable: true })
  skip: number;

@Field(() => String, { nullable: true })
  sort: "ascending" | "descending" | null;
}

@InputType()
export class SearchInput extends ListingInput {
@Field(() => String, { nullable:true })
  type?: "simple";

@Field(() => String, { nullable:false })
  searchString: string;
}
