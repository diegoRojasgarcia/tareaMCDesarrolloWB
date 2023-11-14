import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResponsableService } from '../services/responsable.service';
import { Responsable } from '../entities/responsable.entity';
import { CreateResponsableInput } from '../dto/create-responsable.input';
import { UpdateResponsableInput } from '../dto/update-responsable.input';

@Resolver(() => Responsable)
export class ResponsableResolver {
  constructor(private readonly responsableService: ResponsableService) {}

  // @Mutation(() => Responsable)
  // createResponsable(
  //   @Args('createResponsableInput')
  //   createResponsableInput: CreateResponsableInput,
  // ) {
  //   return this.responsableService.create(createResponsableInput);
  // }

  @Query(() => [Responsable])
  getResponsables() {
    return this.responsableService.findAll();
  }

  // @Query(() => Responsable, { name: 'responsable' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.responsableService.findOne(id);
  // }

  // @Mutation(() => Responsable)
  // updateResponsable(
  //   @Args('updateResponsableInput')
  //   updateResponsableInput: UpdateResponsableInput,
  // ) {
  //   return this.responsableService.update(
  //     updateResponsableInput.id,
  //     updateResponsableInput,
  //   );
  // }

  // @Mutation(() => Responsable)
  // removeResponsable(@Args('id', { type: () => Int }) id: number) {
  //   return this.responsableService.remove(id);
  // }
}
