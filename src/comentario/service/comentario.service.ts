import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentarioInput } from '../dto/create-comentario.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comentario } from '../entities/comentario.entity';
import { Repository } from 'typeorm';
import { TareaService } from 'src/tarea/services/tarea.service';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>,
    private readonly tareaService: TareaService,
  ) {}

  async create(createComentarioInput: CreateComentarioInput) {
    const { idTarea, comentario } = createComentarioInput;
    const tareaDB = await this.tareaService.findOneById(idTarea);
    const comentarioCreated = new Comentario();
    comentarioCreated.comentario = comentario;
    comentarioCreated.tarea = tareaDB;
    return await this.comentarioRepository.save(comentarioCreated);
  }

  async findOneById(id: number): Promise<Comentario> {
    try {
      const comentario = await this.comentarioRepository.findOne({
        where: { id },
      });
      if (!comentario) throw new NotFoundException('Comentario not found');
      return comentario;
    } catch (error) {
      return error;
    }
  }

  async remove(deleteComentarioInput): Promise<Comentario> {
    const { idComentario } = deleteComentarioInput;
    const comentarioDB = await this.findOneById(idComentario);
    try {
      this.comentarioRepository.remove(comentarioDB);
      return comentarioDB;
    } catch (error) {
      return error;
    }
  }
}
