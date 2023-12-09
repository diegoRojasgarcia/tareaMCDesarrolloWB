import { InputType, Int, Field } from '@nestjs/graphql';
import { text } from 'stream/consumers';

@InputType()
export class CreateTareaInput {
  @Field()
  descripcion: string;

  @Field()
  estado: string;

  @Field(() => Int)
  idEquipo: number;

  @Field(() => Int, { nullable: true })
  idResponsable: number;

  @Field({ nullable: true })
  comentario: string;
}
