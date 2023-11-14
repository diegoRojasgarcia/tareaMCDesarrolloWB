import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Responsable {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  // @Field(() => Users)
  // user: Users;

  @Column()
  @Field(() => Int)
  tareaId: number;

  @ManyToOne(() => Tarea, (tarea) => tarea.responsables)
  @Field(() => Tarea)
  tarea: Tarea;
}
