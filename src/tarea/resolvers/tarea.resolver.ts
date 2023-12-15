import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../entities/tarea.entity';
import { CreateTareaInput } from '../dto/create-tarea.input';
import { Equipo } from '../entities/equipos.entity';
import { findTareaDto } from '../dto/findtareaDto';
import { updateTareaDto } from '../dto/update-tarea.input';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { getComentariosByIdTareaDto } from 'src/comentario/dto/get.comentarioById.input';
import { BadRequestException } from '@nestjs/common';
import { UpdateIntegranteDto } from '../dto/update-integranteDto';

@Resolver(() => Tarea)
export class TareaResolver {
  constructor(private readonly tareaService: TareaService) {}

  @Mutation(() => Tarea)
  createTarea(
    @Args('createTareaInput') createTareaInput: CreateTareaInput,
  ): Promise<Tarea> {
    return this.tareaService.create(createTareaInput);
  }

  @Query(() => [Tarea])
  getTareas(): Promise<Tarea[]> {
    return this.tareaService.findAll();
  }

  @Query(() => [Tarea])
  getTareasbyEquipoId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Tarea[]> {
    return this.tareaService.findTareasByEquipoId(id);
  }

  @Query(() => Tarea)
  getTareaById(@Args('id', { type: () => Int }) id: number): Promise<Tarea> {
    return this.tareaService.findOneById(id);
  }

  @Query(() => [Tarea])
  getTareaByEstado(@Args('estado') estado: string): Promise<Tarea[]> {
    return this.tareaService.findTareasByEstado(estado);
  }

  // @Mutation(() => Tarea)
  // updateTarea(@Args('updateTareaInput') updateTareaInput: UpdateTareaInput) {
  //   return this.tareaService.updateTarea(updateTareaInput);
  // }

  @Mutation(() => Tarea)
  updateTarea(
    @Args('findTareaByIdInput') findTareaByIdDto: findTareaDto,
    @Args('updateTareaInput') updateTareaDto: updateTareaDto,
  ): Promise<Tarea> {
    return this.tareaService.updateTarea(findTareaByIdDto, updateTareaDto);
  }

  @Mutation(() => Tarea)
  updateTareaIntegrante(
    @Args('findTareaByIdInput') findTareaByIdDto: findTareaDto,
    @Args('updateIntegranteInput') updateIntegranteDto: UpdateIntegranteDto,
  ): Promise<Tarea> {
    return this.tareaService.updateTareaIntegrante(
      findTareaByIdDto,
      updateIntegranteDto,
    );
  }

  @Query(() => [Comentario])
  getComentariosbyIdTarea(
    @Args('getComentariosbyIdTarea') data: getComentariosByIdTareaDto,
  ): Promise<Comentario[]> {
    try {
      return this.tareaService.findComentariosByIdTarea(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Tarea)
  removeTarea(
    @Args('findTareaByIdDto') findTareaByIdDto: findTareaDto,
  ): Promise<Tarea> {
    return this.tareaService.remove(findTareaByIdDto);
  }

  @ResolveField(() => Equipo)
  equipo(@Parent() tarea: Tarea): any {
    return { __typename: 'Tarea', id: tarea.idEquipo };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.tareaService.findOneById(reference.id);
  }
}
