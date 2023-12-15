import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateIntegranteDto {
  @Field(() => Int)
  idResponsable: number;
}
