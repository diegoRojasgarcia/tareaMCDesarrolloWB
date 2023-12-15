import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class getComentariosByIdTareaDto {
  @Field(() => Int)
  id: number;
}
