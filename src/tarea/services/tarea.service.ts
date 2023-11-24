import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaInput } from '../dto/create-tarea.input';
import { UpdateTareaInput } from '../dto/update-tarea.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {}

  create(createTareaInput: CreateTareaInput) {
    const newTarea = this.tareaRepository.create(createTareaInput);
    return this.tareaRepository.save(newTarea);
  }

  findAll(): Promise<Tarea[]> {
    return this.tareaRepository.find();
  }

  async findOneById(id: number) {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
    });
    if (!tarea) throw new NotFoundException('Tarea not found');
    return tarea;
  }

  async findTareasByEquipoId(id: number) {
    const tareas = this.findAll();
    const tareasByIdEquipo = (await tareas).filter(
      (tareas) => tareas.idEquipo === id,
    );
    if (!tareasByIdEquipo) return [];
    return tareasByIdEquipo;
  }

  async updateTarea(updateTareaDto: UpdateTareaInput) {
    const tarea = await this.tareaRepository.preload({
      id: updateTareaDto.id,
      ...updateTareaDto,
    });

    if (!tarea)
      throw new NotFoundException(
        `Tarea whit id: ${updateTareaDto.id} not found`,
      );

    try {
      await this.tareaRepository.save(tarea);
      return tarea;
    } catch (error) {
      return error;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} tarea`;
  // }

  // async forProyectoId(proyectoId: number) {
  //   const equipos = await this.equipoRepository.find();
  //   if (!equipos) return [];
  //   return equipos.filter((equipos) => equipos.idProyecto === proyectoId);
  // }

  async forEquipoId(equipoId: number) {
    const tareas = await this.tareaRepository.find();
    if (!tareas) return [];
    return tareas.filter((tareas) => tareas.idEquipo === equipoId);
  }
}
