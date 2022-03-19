import { Component } from '@angular/core'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'
import { SharedModule } from '@shared/shared.module'
import { ButtonRadioComponent } from './button-radio.component'

const cases = {
	simples: ` <form [formGroup]="formExample">
  <hmv-button-radio formControlName="select" labelName="My Radio" [options]="options"></hmv-button-radio>`,
}

@Component({ template: '' })
class CustomHostComponent {
	formExample!: FormGroup
	options = ['Sim', 'Nao']

	constructor(private fb: FormBuilder) {
		this.formExample = this.fb.group({
			select: ['', []],
		})
	}
	title = 'Custom HostComponent'
}

describe('ButtonRadioComponent', () => {
	let host: SpectatorHost<ButtonRadioComponent, CustomHostComponent>
	const createHost = createHostFactory({
		component: ButtonRadioComponent,
		host: CustomHostComponent,
		imports: [SharedModule],
		mocks: [NgForm],
	})

	it('should create', () => {
		host = createHost(cases.simples)

		expect(host.component).toBeTruthy()
		expect(host.fixture).toMatchSnapshot()
	})

	it('should select a option', () => {
		host = createHost(cases.simples)
		const check = host.query('input[value="Sim"]') as HTMLElement
		const getSelect = () => host.hostComponent.formExample.value

		check.click()
		expect(getSelect().select).toBe('Sim')
		const check2 = host.query('input[value="Nao"]') as HTMLElement
		check2.click()
		expect(getSelect().select).not.toBe('Sim')
	})
})
