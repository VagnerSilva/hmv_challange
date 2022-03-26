/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormBuilder } from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ProcedimentosRealizadosService } from '@core/services/api/procedimentos-realizados.service'
import { Spectator } from '@ngneat/spectator'
import { createComponentFactory } from '@ngneat/spectator/jest'
import { RxFormBuilder } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { ToastrService } from 'ngx-toastr'
import { of, throwError } from 'rxjs'
import { AutenticacaoComponent } from './autenticacao.component'

describe('AutenticacaoComponent', () => {
	let comp: Spectator<AutenticacaoComponent>
	const componentCreator = createComponentFactory({
		component: AutenticacaoComponent,
		imports: [SharedModule, RouterTestingModule.withRoutes([])],
		componentViewProvidersMocks: [ProcedimentosRealizadosService, ToastrService],
		providers: [
			Router,
			{ provide: RxFormBuilder, useValue: new FormBuilder() },
			{
				provide: Router,
				useValue: {
					events: of(new NavigationEnd(1, 'url', 'uri')),
				},
			},
		],
	})

	beforeEach(async () => {
		comp = componentCreator()
	})

	it('Deve criar componente', () => {
		expect(comp.component).toBeTruthy()
	})

	it('Deve registra "procedimento" ', () => {
		const btn = comp.query('button')
		const input = comp.query('input')
		comp.typeInElement('1', input as Element)

		comp.component['_procedimentoSrv'].cadastro = () => of(true)
		expect(btn).toHaveText('Autenticar')
		const proc: any = {}
		comp.component['_procedimentoSrv'].cadastro(proc).subscribe({
			next: (status) => status, //?
		})
		comp.click('button')

		expect(comp.component.authForm.valid).toBeTruthy()
		expect(comp.component.show).toBeTruthy()
	})

	it('Deve notificar usuario invalido', () => {
		const btn = comp.query('button')
		comp.component.authForm.get('idSocorrista')?.setValue(1)
		comp.component['_procedimentoSrv'].cadastro = () => of(false)
		comp.component['_toastr'].error = jest.fn()
		expect(btn).toHaveText('Autenticar')
		const proc: any = {}
		comp.component['_procedimentoSrv'].cadastro(proc).subscribe({
			next: (status) => status, //?
		})
		comp.click('button')
		expect(comp.component.authForm.valid).toBeTruthy()
		expect(comp.component.show).toBeFalsy()
		expect(comp.component['_toastr'].error).toHaveBeenCalledTimes(1)
	})

	it('Deve notificar "Usuário não encontrado"', () => {
		const btn = comp.query('button')
		const input = comp.query('input')
		comp.typeInElement('1', input as Element)
		comp.component['_procedimentoSrv'].cadastro = () => throwError(() => 'Usuário não encontrado')
		comp.component['_toastr'].error = jest.fn()
		expect(btn).toHaveText('Autenticar')
		const proc: any = {}
		comp.component['_procedimentoSrv'].cadastro(proc).subscribe({
			error: (status) => expect(status).toContain('Usuário não encontrado'),
		})
		comp.click('button')
		expect(comp.component.authForm.valid).toBeTruthy()
		expect(comp.component.show).toBeFalsy()
		expect(comp.component['_toastr'].error).toHaveBeenCalledTimes(1)
	})
})
