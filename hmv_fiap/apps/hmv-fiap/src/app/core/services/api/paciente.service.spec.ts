import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let spectator: SpectatorService<PacienteService>;
  const createService = createServiceFactory(PacienteService);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});