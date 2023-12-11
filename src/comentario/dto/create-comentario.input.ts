import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateComentarioInput {
  @Field()
  comentario: string;

  @Field(() => Int)
  idTarea: number;
}
