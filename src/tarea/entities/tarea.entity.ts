import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';
import { Responsable } from 'src/responsable/entities/responsable.entity';
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  comentario?: string;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public created_at: Date;

  @UpdateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public updated_at: Date;
}
