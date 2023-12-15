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
    try {
      return this.tareaService.create(createTareaInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Tarea])
  getTareas(): Promise<Tarea[]> {
    try {
      return this.tareaService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Tarea])
  getTareasbyEquipoId(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Tarea[]> {
    try {
      return this.tareaService.findTareasByEquipoId(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => Tarea)
  getTareaById(@Args('id', { type: () => Int }) id: number): Promise<Tarea> {
    try {
      return this.tareaService.findOneById(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query(() => [Tarea])
  getTareaByEstado(@Args('estado') estado: string): Promise<Tarea[]> {
    try {
      return this.tareaService.findTareasByEstado(estado);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Tarea)
  updateTarea(
    @Args('findTareaByIdInput') findTareaByIdDto: findTareaDto,
    @Args('updateTareaInput') updateTareaDto: updateTareaDto,
  ): Promise<Tarea> {
    try {
      return this.tareaService.updateTarea(findTareaByIdDto, updateTareaDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Tarea)
  updateTareaIntegrante(
    @Args('findTareaByIdInput') findTareaByIdDto: findTareaDto,
    @Args('updateIntegranteInput') updateIntegranteDto: UpdateIntegranteDto,
  ): Promise<Tarea> {
    try {
      return this.tareaService.updateTareaIntegrante(
        findTareaByIdDto,
        updateIntegranteDto,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
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
    try {
      return this.tareaService.remove(findTareaByIdDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ResolveField(() => Equipo)
  equipo(@Parent() tarea: Tarea): any {
    try {
      return { __typename: 'Tarea', id: tarea.idEquipo };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    try {
      return this.tareaService.findOneById(reference.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
