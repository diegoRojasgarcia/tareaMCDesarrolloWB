import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class findTareaDto {
  @Field(() => Int)
  id: number;
}
