import { Module } from '@nestjs/common';
import { ResponsableService } from './services/responsable.service';
import { ResponsableResolver } from './resolvers/responsable.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsable } from './entities/responsable.entity';
import { TareaModule } from 'src/tarea/tarea.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
    TypeOrmModule.forFeature([Responsable]),
    TareaModule,
  ],
  providers: [ResponsableResolver, ResponsableService],
})
export class ResponsableModule {}
