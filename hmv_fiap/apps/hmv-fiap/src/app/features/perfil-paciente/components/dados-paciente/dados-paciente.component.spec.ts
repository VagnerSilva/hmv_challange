import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { DadosPacienteComponent } from './dados-paciente.component'

describe('PerfilPacienteComponent', () => {
	let spectator: Spectator<DadosPacienteComponent>
	const createComponent = createComponentFactory(DadosPacienteComponent)

	it('should create', () => {
		spectator = createComponent()

		expect(spectator.component).toBeTruthy()
	})
})
