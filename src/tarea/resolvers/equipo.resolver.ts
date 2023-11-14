import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { TareaService } from '../services/tarea.service';
import { Tarea } from '../entities/tarea.entity';
import { Equipo } from '../entities/equipos.entity';

@Resolver(() => Equipo)
export class EquipoResolver {
  constructor(private readonly tareaService: TareaService) {}

  @ResolveField(() => [Tarea])
  tareas(@Parent() equipo: Equipo) {
    return this.tareaService.forEquipoId(equipo.id);
  }
}
