import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaInput } from '../dto/create-tarea.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from '../entities/tarea.entity';
import { findTareaDto } from '../dto/findtareaDto';
import { updateTareaDto } from '../dto/update-tarea.input';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { UpdateIntegranteDto } from '../dto/update-integranteDto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {}

  create(createTareaInput: CreateTareaInput): Promise<Tarea> {
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

  async findOneById(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
    });
    if (!tarea) throw new NotFoundException('Tarea not found');
    return tarea;
  }

  async findOneByIdComentario(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: {
        comentarios: true,
      },
    });
    if (!tarea) throw new NotFoundException('Tarea not found');
    return tarea;
  }

  async findTareasByEquipoId(id: number): Promise<Tarea[]> {
    const tareas = this.findAll();
    const tareasByIdEquipo = (await tareas).filter(
      (tareas) => tareas.idEquipo === id,
    );
    if (!tareasByIdEquipo) return [];
    return tareasByIdEquipo;
  }

  async findComentariosByIdTarea(
    getComentariosByIdTareaDto,
  ): Promise<Comentario[]> {
    const { id } = getComentariosByIdTareaDto;
    try {
      const tarea = await this.findOneByIdComentario(id);
      return tarea.comentarios;
    } catch (error) {}
  }

  async findTareasByEstado(estado: string): Promise<Tarea[]> {
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
  ): Promise<Tarea> {
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

  async updateTareaIntegrante(
    findTareaByIdDto: findTareaDto,
    updateIntegranteDto: UpdateIntegranteDto,
  ): Promise<Tarea> {
    const tareaDB = await this.findOneById(findTareaByIdDto.id);
    if (!tareaDB)
      throw new NotFoundException(
        `Tarea whit id: ${findTareaByIdDto.id} not found`,
      );
    tareaDB.idResponsable = updateIntegranteDto.idResponsable;
    try {
      await this.tareaRepository.save(tareaDB);
      return tareaDB;
    } catch (error) {
      return error;
    }
  }

  async remove(findTareaByIdDto: findTareaDto): Promise<Tarea> {
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

  async forEquipoId(equipoId: number): Promise<Tarea[]> {
    const tareas = await this.tareaRepository.find();
    if (!tareas) return [];
    return tareas.filter((tareas) => tareas.idEquipo === equipoId);
  }
}
