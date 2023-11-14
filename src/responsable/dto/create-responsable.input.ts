import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateResponsableInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
