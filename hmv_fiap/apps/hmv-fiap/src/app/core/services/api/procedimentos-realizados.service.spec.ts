import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ProcedimentosRealizadosService } from './procedimentos-realizados.service';

describe('ProcedimentosRealizadosService', () => {
  let spectator: SpectatorService<ProcedimentosRealizadosService>;
  const createService = createServiceFactory(ProcedimentosRealizadosService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});