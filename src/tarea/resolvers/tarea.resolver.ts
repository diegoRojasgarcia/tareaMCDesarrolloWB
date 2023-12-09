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

@Resolver(() => Tarea)
export class TareaResolver {
  constructor(private readonly tareaService: TareaService) {}

  @Mutation(() => Tarea)
  createTarea(@Args('createTareaInput') createTareaInput: CreateTareaInput) {
    return this.tareaService.create(createTareaInput);
  }

  @Query(() => [Tarea])
  getTareas() {
    return this.tareaService.findAll();
  }

  @Query(() => [Tarea])
  getTareasbyEquipoId(@Args('id', { type: () => Int }) id: number) {
    return this.tareaService.findTareasByEquipoId(id);
  }

  @Query(() => Tarea)
  getTareaById(@Args('id', { type: () => Int }) id: number) {
    return this.tareaService.findOneById(id);
  }

  @Query(() => Tarea)
  getTareaByEstado(@Args('estado') estado: string) {
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

  // @Mutation(() => Tarea)
  // removeTarea(@Args('id') id: number) {
  //   return this.tareaService.remove(+id);
  // }

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
