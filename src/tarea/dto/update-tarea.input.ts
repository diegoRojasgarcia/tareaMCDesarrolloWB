import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class updateTareaDto {
  @Field()
  descripcion: string;

  @Field()
  estado: string;

  @Field()
  comentario: string;
}
