import { CreateResponsableInput } from './create-responsable.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResponsableInput extends PartialType(CreateResponsableInput) {
  @Field(() => Int)
  id: number;
}
