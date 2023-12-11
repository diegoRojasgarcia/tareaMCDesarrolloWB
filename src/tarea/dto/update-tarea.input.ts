import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class updateTareaDto {
  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  estado?: string;
}
