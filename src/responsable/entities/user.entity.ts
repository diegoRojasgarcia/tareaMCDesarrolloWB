import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Tarea } from 'src/tarea/entities/tarea.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Users {
  @Field((type) => Int)
  id: number;

  @Field((type) => [Tarea])
  tareas?: Tarea[];
}
