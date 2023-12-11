import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comentario {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text' })
  @Field()
  comentario: string;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  created_at: Date;

  @ManyToOne(() => Tarea, (tarea) => tarea.comentarios)
  tarea: Tarea;
}
