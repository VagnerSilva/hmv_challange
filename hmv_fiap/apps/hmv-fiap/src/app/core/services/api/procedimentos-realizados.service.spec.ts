import {
	ProcedimentoRealizadoModel,
	ProcedimentoRealizadosRequest,
} from '@core/models/procedimentos-relizados.model'
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest'
import { pacienteMock } from './paciente.service.spec'
import { ProcedimentosRealizadosService } from './procedimentos-realizados.service'

export const procedimentoMock = {
	medicamentoMinistrado: 'Sim',
	observacoes: 'observacoes',
	pacienteComPerdaDeConciencia: 'Sim',
	pressaoArterialPA: false,
	procedimentoCardiopulmonar: 'Não',
	pulso: true,
	pulsoObservacao: 'pulsoObservacao',
	respiracao: true,
	respiracaoObservacao: 'respiracaoObservacao',
	temperatura: true,
} as ProcedimentoRealizadoModel

const cases = {
	sucess: {
		response: true,
		procedimentoRequest: {
			idSocorrista: 123456,
			paciente: pacienteMock,
			...procedimentoMock,
		} as ProcedimentoRealizadosRequest,
	},
}
describe('ProcedimentosRealizadosService', () => {
	let spectator: SpectatorHttp<ProcedimentosRealizadosService>
	const createService = createHttpFactory(ProcedimentosRealizadosService)

	beforeEach(() => (spectator = createService()))

	it('Deve criar servico', () => {
		expect(spectator.service).toBeTruthy()
	})

	it('Deve obter salvar procedimento', () => {
		spectator.service.cadastro(cases.sucess.procedimentoRequest).subscribe({
			next: (resp) => expect(resp).toBeTruthy(), //?
		})
		const url = spectator.service.apiURL
		const req = spectator.expectOne(`${url}/procedimentos/cadastro`, HttpMethod.POST)
		req.flush(cases.sucess.response)
	})
})
