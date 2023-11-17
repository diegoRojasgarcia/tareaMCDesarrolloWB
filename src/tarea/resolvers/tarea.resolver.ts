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
import { UpdateTareaInput } from '../dto/update-tarea.input';
import { Equipo } from '../entities/equipos.entity';

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

  // @Query(() => Tarea, { name: 'tarea' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.tareaService.findOne(id);
  // }

  // @Mutation(() => Tarea)
  // updateTarea(@Args('updateTareaInput') updateTareaInput: UpdateTareaInput) {
  //   return this.tareaService.update(updateTareaInput.id, updateTareaInput);
  // }

  // @Mutation(() => Tarea)
  // removeTarea(@Args('id', { type: () => Int }) id: number) {
  //   return this.tareaService.remove(id);
  // }

  @ResolveField(() => Equipo)
  equipo(@Parent() tarea: Tarea): any {
    return { __typename: 'Tarea', id: tarea.idEquipo };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.tareaService.findOneById(reference.id);
  }
}
