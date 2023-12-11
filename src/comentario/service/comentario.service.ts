import { Injectable } from '@nestjs/common';
import { CreateComentarioInput } from '../dto/create-comentario.input';
import { UpdateComentarioInput } from '../dto/update-comentario.input';
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

  // findAll() {
  //   return `This action returns all comentario`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} comentario`;
  // }

  // update(id: number, updateComentarioInput: UpdateComentarioInput) {
  //   return `This action updates a #${id} comentario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comentario`;
  // }
}
