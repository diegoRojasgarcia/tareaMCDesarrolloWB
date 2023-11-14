import { Module } from '@nestjs/common';
import { TareaService } from './services/tarea.service';
import { TareaResolver } from './resolvers/tarea.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { EquipoResolver } from './resolvers/equipo.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forFeature([Tarea]),
    TareaModule,
  ],
  providers: [TareaResolver, TareaService, EquipoResolver],
  exports: [TareaService],
})
export class TareaModule {}
