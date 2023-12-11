import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioResolver } from './comentario.resolver';
import { ComentarioService } from '../service/comentario.service';

describe('ComentarioResolver', () => {
  let resolver: ComentarioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentarioResolver, ComentarioService],
    }).compile();

    resolver = module.get<ComentarioResolver>(ComentarioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
