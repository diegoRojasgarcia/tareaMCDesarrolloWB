import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ComentarioService } from '../service/comentario.service';
import { Comentario } from '../entities/comentario.entity';
import { CreateComentarioInput } from '../dto/create-comentario.input';
import { UpdateComentarioInput } from '../dto/update-comentario.input';
import { DeletedComentarioInput } from '../dto/delete-comentario.input';
import { getComentariosByIdTareaDto } from '../dto/get.comentarioById.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Comentario)
export class ComentarioResolver {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Mutation(() => Comentario)
  createComentario(
    @Args('createComentarioInput') createComentarioInput: CreateComentarioInput,
  ): Promise<Comentario> {
    return this.comentarioService.create(createComentarioInput);
  }

  @Mutation(() => Comentario)
  removeComentario(
    @Args('deleteComentarioInput')
    deleteComentarioInput: DeletedComentarioInput,
  ): Promise<Comentario> {
    return this.comentarioService.remove(deleteComentarioInput);
  }
}
