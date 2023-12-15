import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class DeletedComentarioInput {
  @Field(() => Int)
  idComentario: number;
}
