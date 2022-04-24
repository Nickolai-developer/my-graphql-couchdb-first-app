import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ListingInput {
@Field(() => Int, { nullable: false })
  count: number;

@Field(() => Int, { nullable: true })
  skip: number;
}

@InputType()
export class SearchInput {
@Field(() => String, { nullable:true })
  type?: "simple";

@Field(() => String, { nullable:false })
  searchString: string;
}
