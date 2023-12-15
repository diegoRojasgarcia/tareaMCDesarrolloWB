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
  ) {
    return this.comentarioService.create(createComentarioInput);
  }

  // @Query(() => Comentario, { name: 'comentario' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.comentarioService.findOne(id);
  // }

  // @Mutation(() => Comentario)
  // updateComentario(@Args('updateComentarioInput') updateComentarioInput: UpdateComentarioInput) {
  //   return this.comentarioService.update(updateComentarioInput.id, updateComentarioInput);
  // }

  @Mutation(() => Comentario)
  removeComentario(
    @Args('deleteComentarioInput')
    deleteComentarioInput: DeletedComentarioInput,
  ) {
    return this.comentarioService.remove(deleteComentarioInput);
  }
}
