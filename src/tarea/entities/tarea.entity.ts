import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Equipo } from './equipos.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Tarea {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  descripcion: string;

  @Column()
  @Field()
  estado: string;

  @OneToMany(() => Responsable, (responsables) => responsables.tarea)
  @Field(() => [Responsable])
  responsables?: Responsable[];

  @Column()
  @Field(() => Int)
  idEquipo: number;

  @Field(() => Equipo)
  equipo?: Equipo;
}
