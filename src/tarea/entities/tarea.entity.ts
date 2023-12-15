import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Equipo } from './equipos.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Tarea {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text' })
  @Field()
  descripcion: string;

  @Column({ type: 'text', default: 'Creada' })
  @Field()
  estado?: String;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  idResponsable: number;

  @Column()
  @Field(() => Int)
  idEquipo: number;

  @Field(() => Equipo)
  equipo?: Equipo;

  @Field(() => [Comentario], { nullable: true })
  @OneToMany(() => Comentario, (comentario) => comentario.tarea, {
    onDelete: 'CASCADE',
  })
  comentarios?: Comentario[];

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  created: Date;

  @UpdateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  updated: Date;
}
