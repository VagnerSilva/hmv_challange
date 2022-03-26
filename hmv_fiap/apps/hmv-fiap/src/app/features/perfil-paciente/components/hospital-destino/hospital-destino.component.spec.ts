import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProcedimentosRealizadosService } from '@core/services/api/procedimentos-realizados.service'
import { DataService } from '@core/services/data.service'
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { RxFormBuilder } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { ToastrService } from 'ngx-toastr'
import { HospitalDestinoComponent } from './hospital-destino.component'

describe('HospitalDestinoComponent', () => {
	let comp: Spectator<HospitalDestinoComponent>

	const componentCreator = createComponentFactory({
		component: HospitalDestinoComponent,
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
						paramMap: {
							get: () => 1, // represents the bookId
						},
					},
				},
			},
			{ provide: DataService, useValue: { storage: {} } },
		],
		shallow: false,
	})

	it('Deve carrega card', () => {
		comp = componentCreator()
		expect(comp.query('.card-title')).toHaveText('Hospital de Destino')
	})

	it('Deve registra "procedimento" ', async () => {
		comp = componentCreator()

		const btn = comp.query('button')
		const select = comp.query('mat-select') as HTMLElement
		select.click()
		comp.detectChanges()
		const options = document.querySelectorAll(
			'.mat-select-panel mat-option',
		) as NodeListOf<HTMLElement>
		options[1].click()
		comp.detectChanges()
		comp.component['_route'].navigate = jest.fn()

		comp.detectChanges()
		comp.detectComponentChanges()
		comp.click('button')
		expect(comp.component.hospitalForm.value).not.toBeNull()
		expect(btn).toHaveText('ENTRAR EM CONTATO COM HOSPITAL')
		expect(comp.component.hospitalForm.invalid).toBeFalsy()
		expect(comp.component['_route'].navigate).toBeCalledTimes(1)
	})
})
