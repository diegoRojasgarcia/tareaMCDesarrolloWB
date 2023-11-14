import { Injectable } from '@nestjs/common';
import { CreateResponsableInput } from '../dto/create-responsable.input';
import { UpdateResponsableInput } from '../dto/update-responsable.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Responsable } from '../entities/responsable.entity';
import { Repository } from 'typeorm';
import { TareaService } from 'src/tarea/services/tarea.service';

@Injectable()
export class ResponsableService {
  constructor(
    @InjectRepository(Responsable)
    private responsableRepository: Repository<Responsable>,
    private readonly tareaService: TareaService,
  ) {}
  // create(createResponsableInput: CreateResponsableInput) {
  //   return 'This action adds a new responsable';
  // }
  findAll() {
    return this.responsableRepository.find();
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} responsable`;
  // }
  // update(id: number, updateResponsableInput: UpdateResponsableInput) {
  //   return `This action updates a #${id} responsable`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} responsable`;
  // }
}
