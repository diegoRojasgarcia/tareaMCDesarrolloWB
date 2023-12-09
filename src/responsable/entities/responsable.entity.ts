import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

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

  @Field(() => Users)
  user: Users;

  @Column()
  @Field(() => Int)
  tareaId: number;

  // @OneToOne(() => Tarea, (tarea) => tarea.responsable)
  // @Field(() => Tarea)
  // tarea: Tarea;
}
