import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaInput } from '../dto/create-tarea.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { findTareaDto } from '../dto/findtareaDto';
import { updateTareaDto } from '../dto/update-tarea.input';

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
    return this.tareaRepository.find({
      relations: {
        comentarios: true,
      },
    });
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

  async findTareasByEstado(estado: string) {
    const tareas = this.findAll();
    const tareasByEstado = (await tareas).filter(
      (tareas) => tareas.estado === estado,
    );
    if (!tareasByEstado) return [];
    return tareasByEstado;
  }

  async updateTarea(
    findTareaByIdDto: findTareaDto,
    updateTareaDto: updateTareaDto,
  ) {
    const tarea = await this.tareaRepository.preload({
      id: findTareaByIdDto.id,
      ...updateTareaDto,
    });

    if (!tarea)
      throw new NotFoundException(
        `Tarea whit id: ${findTareaByIdDto.id} not found`,
      );

    try {
      await this.tareaRepository.save(tarea);
      return tarea;
    } catch (error) {
      return error;
    }
  }

  async remove(findTareaByIdDto: findTareaDto) {
    const tareaDB = await this.findOneById(findTareaByIdDto.id);
    if (!tareaDB)
      throw new NotFoundException(
        'Error al eliminar la tarea, intentalo nuevamente.',
      );
    try {
      this.tareaRepository.remove(tareaDB);
      return tareaDB;
    } catch (error) {
      return error;
    }
  }

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
