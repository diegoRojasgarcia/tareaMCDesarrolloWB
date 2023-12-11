import { Module } from '@nestjs/common';
import { ComentarioService } from './service/comentario.service';
import { ComentarioResolver } from './resolvers/comentario.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { TareaModule } from 'src/tarea/tarea.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario]), TareaModule],
  providers: [ComentarioResolver, ComentarioService],
})
export class ComentarioModule {}
