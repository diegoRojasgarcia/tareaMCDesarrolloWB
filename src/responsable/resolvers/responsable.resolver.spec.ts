import { Test, TestingModule } from '@nestjs/testing';
import { ResponsableResolver } from './responsable.resolver';
import { ResponsableService } from '../services/responsable.service';

describe('ResponsableResolver', () => {
  let resolver: ResponsableResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsableResolver, ResponsableService],
    }).compile();

    resolver = module.get<ResponsableResolver>(ResponsableResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
