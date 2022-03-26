import { PacienteModel } from '@core/models/paciente.model'
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest'
import { PacienteService } from './paciente.service'

export const pacienteMock: PacienteModel = {
	alergia: 'alergia',
	descricao: 'descricao',
	idade: 0,
	medicamentoUsoContinuo: 'medicamentoUsoContinuo',
	nomePaciente: 'nome',
	userId: 1232456,
}

describe('PacienteService', () => {
	let spectator: SpectatorHttp<PacienteService>
	const createService = createHttpFactory({
		service: PacienteService,
	})

	const cases = {
		userId: '1232456',
		paciente: pacienteMock,
	}

	beforeEach(() => (spectator = createService()))

	it('Deve criar servico', () => {
		expect(spectator.service).toBeTruthy()
	})

	it('Deve obter paciente', () => {
		spectator.service.obterPaciente(cases.userId).subscribe({
			next: (resp) => expect(resp.userId.toString()).toEqual(cases.userId),
		})
		const url = spectator.service.apiURL
		const req = spectator.expectOne(`${url}/paciente/${cases.userId}`, HttpMethod.GET)
		req.flush(cases.paciente)
	})
})
