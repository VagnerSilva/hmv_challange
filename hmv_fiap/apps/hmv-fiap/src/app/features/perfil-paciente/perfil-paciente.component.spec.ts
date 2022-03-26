import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProcedimentosRealizadosService } from '@core/services/api/procedimentos-realizados.service'
import { DataService } from '@core/services/data.service'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { RxFormBuilder } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { ToastrService } from 'ngx-toastr'
import { PerfilPacienteComponent } from './perfil-paciente.component'

const paciente = {
	nomePaciente: 'nome',
	userId: 123456,
}

describe('PerfilPacienteComponent', () => {
	let comp: Spectator<PerfilPacienteComponent>

	const componentCreator = createComponentFactory({
		component: PerfilPacienteComponent,
		imports: [SharedModule],
		schemas: [CUSTOM_ELEMENTS_SCHEMA],
		componentViewProvidersMocks: [
			DataService,
			ProcedimentosRealizadosService,
			ToastrService,
			Router,
		],
		providers: [
			{ provide: RxFormBuilder, useValue: new FormBuilder() },
			{
				provide: ActivatedRoute,
				useValue: {
					snapshot: {
						data: {
							paciente,
						},
					},
				},
			},
			{ provide: DataService, useValue: { storage: {} } },
		],
		shallow: false,
	})

	it('Deve criar componente', () => {
		comp = componentCreator()
		expect(comp.fixture.componentInstance).toBeTruthy()
	})

	it('Deve carrega perfil" ', async () => {
		comp = componentCreator()
		expect(comp.component.paciente).toBe(paciente)
	})
})
