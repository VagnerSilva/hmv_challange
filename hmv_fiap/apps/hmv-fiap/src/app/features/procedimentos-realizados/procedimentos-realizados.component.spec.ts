import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatCheckboxHarness } from '@angular/material/checkbox/testing'
import { MatInputHarness } from '@angular/material/input/testing'
import { MatRadioGroupHarness } from '@angular/material/radio/testing'
import { ProcedimentoRealizadoModel } from '@core/models/procedimentos-relizados.model'
import { procedimentoMock } from '@core/services/api/procedimentos-realizados.service.spec'
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest'
import { RxFormBuilder } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { ngMocks } from 'ng-mocks'
import { ProcedimentosRealizadosComponent } from './procedimentos-realizados.component'

const cases = {
	procedimento: procedimentoMock,
	checkbok: async (loader: HarnessLoader, label: string) => {
		const checkbox: MatCheckboxHarness = await loader.getHarness(MatCheckboxHarness.with({ label }))
		await checkbox.check()
	},
	textArea: async (loader: HarnessLoader, placeholder: string, value: string, index = 1) => {
		if (index === 1) {
			const textArea: MatInputHarness = await loader.getHarness(
				MatInputHarness.with({ placeholder }),
			)
			await textArea.setValue(value)
		} else {
			const textAreas: MatInputHarness[] = await loader.getAllHarnesses(
				MatInputHarness.with({ placeholder }),
			)
			await textAreas[index - 1].setValue(value)
		}
	},
	radioBox: async (loader: HarnessLoader, ancestor: string, label: string) => {
		const radioBox: MatRadioGroupHarness = await loader.getHarness(
			MatRadioGroupHarness.with({ ancestor }),
		)

		await radioBox.checkRadioButton({ label })
	},
}
describe('ProcedimentosRealizadosComponent', () => {
	ngMocks.faster()

	let comp: SpectatorRouting<ProcedimentosRealizadosComponent>
	const createComponent = createRoutingFactory({
		component: ProcedimentosRealizadosComponent,
		imports: [SharedModule],
		params: { userId: '123456' },
		providers: [
			{
				provide: RxFormBuilder,
				useValue: {
					formGroup: () =>
						new FormGroup({
							respiracao: new FormControl(false),
							respiracaoObservacao: new FormControl(''),
							pulso: new FormControl(false),
							pulsoObservacao: new FormControl(''),
							pressaoArterialPA: new FormControl(false),
							temperatura: new FormControl(false),
							medicamentoMinistrado: new FormControl('', [Validators.required]),
							pacienteComPerdaDeConciencia: new FormControl('', [Validators.required]),
							procedimentoCardiopulmonar: new FormControl('', [Validators.required]),
							observacoes: new FormControl(''),
						}),
				},
			},
		],
	})

	it('Deve criar componente create', async () => {
		comp = createComponent()
		comp.detectChanges()
		expect(comp.fixture.componentInstance).toBeTruthy()
	})

	it('Deve salvar procedimenento', async () => {
		comp = createComponent()
		const fixture = comp.fixture //?
		const loader: HarnessLoader = TestbedHarnessEnvironment.loader(fixture)
		const form = () => comp.component.pRealizadoForm.value as ProcedimentoRealizadoModel
		comp.detectChanges()

		expect(cases.procedimento.respiracao).not.toEqual(form().respiracao)
		await cases.checkbok(loader, 'Respiração')
		expect(cases.procedimento.respiracao).toEqual(form().respiracao)

		expect(cases.procedimento.respiracaoObservacao).not.toEqual(form().respiracaoObservacao)
		await cases.textArea(loader, 'observação', cases.procedimento.respiracaoObservacao)
		expect(cases.procedimento.respiracaoObservacao).toEqual(form().respiracaoObservacao)

		expect(cases.procedimento.pulso).not.toEqual(form().pulso)
		await cases.checkbok(loader, 'Pulso')
		expect(cases.procedimento.pulso).toEqual(form().pulso)

		expect(cases.procedimento.pulsoObservacao).not.toEqual(form().pulsoObservacao)
		await cases.textArea(loader, 'observação', cases.procedimento.pulsoObservacao, 2)
		expect(cases.procedimento.pulsoObservacao).toEqual(form().pulsoObservacao)

		expect(cases.procedimento.pressaoArterialPA).toEqual(form().pressaoArterialPA)
		await cases.checkbok(loader, 'Pressão arterial (PA)')
		expect(cases.procedimento.pressaoArterialPA).not.toEqual(form().pressaoArterialPA)

		expect(cases.procedimento.temperatura).not.toEqual(form().temperatura)
		await cases.checkbok(loader, 'Temperatura')
		expect(cases.procedimento.temperatura).toEqual(form().temperatura)

		expect(cases.procedimento.medicamentoMinistrado).not.toEqual(form().medicamentoMinistrado)
		await cases.radioBox(loader, '.medicamentoMinistrado', cases.procedimento.medicamentoMinistrado)
		expect(cases.procedimento.medicamentoMinistrado).toEqual(form().medicamentoMinistrado)

		expect(cases.procedimento.pacienteComPerdaDeConciencia).not.toEqual(
			form().pacienteComPerdaDeConciencia,
		)
		await cases.radioBox(
			loader,
			'.pacienteComPerdaDeConciencia',
			cases.procedimento.pacienteComPerdaDeConciencia,
		)
		expect(cases.procedimento.pacienteComPerdaDeConciencia).toEqual(
			form().pacienteComPerdaDeConciencia,
		)

		const btn = comp.query('button') as HTMLElement
		btn.click()
		comp.detectChanges()
		expect(comp.component.pRealizadoForm.invalid).toBeTruthy()

		expect(cases.procedimento.procedimentoCardiopulmonar).not.toEqual(
			form().procedimentoCardiopulmonar,
		)
		await cases.radioBox(
			loader,
			'.procedimentoCardiopulmonar',
			cases.procedimento.procedimentoCardiopulmonar,
		)
		expect(cases.procedimento.procedimentoCardiopulmonar).toEqual(form().procedimentoCardiopulmonar)

		expect(cases.procedimento.observacoes).not.toEqual(form().observacoes)
		await cases.textArea(loader, 'observações', cases.procedimento.observacoes)
		expect(cases.procedimento.observacoes).toEqual(form().observacoes)

		btn.click()
		comp.detectChanges()
		expect(comp.component.pRealizadoForm.invalid).toBeFalsy()

		expect(comp.fixture.componentInstance).toBeTruthy()
	})
})
