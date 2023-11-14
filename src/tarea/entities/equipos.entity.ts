import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Tarea } from './tarea.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Equipo {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Tarea])
  tareas?: Tarea[];
}
