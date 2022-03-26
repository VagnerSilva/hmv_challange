import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { PacienteModel } from '@core/models/paciente.model'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { SharedModule } from '@shared/shared.module'
import { DadosPacienteComponent } from './dados-paciente.component'

describe('DadosPacienteComponent', () => {
	let spectator: Spectator<DadosPacienteComponent>
	const createComponent = createComponentFactory({
		component: DadosPacienteComponent,
		imports: [SharedModule],
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
	})

	it('Deve criar card', () => {
		spectator = createComponent({
			props: {
				paciente: {
					alergia: `alergia`,
					descricao: 'descricao',
					idade: 0,
					medicamentoUsoContinuo: 'medicamentoUsoContinuo',
					nomePaciente: 'nomePaciente',
					userId: 123456,
				} as PacienteModel,
			},
		})
		expect(spectator.query('.card')).toBeTruthy()
		expect(spectator.component).toBeTruthy()
	})
})
