import { Component } from '@angular/core'
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { createHostFactory, Spectator } from '@ngneat/spectator/jest'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { SelectComponent } from './select.component'

@Component({ template: '' })
class CustomHostComponent {
	formExample!: FormGroup

	constructor(private fb: FormBuilder) {
		this.formExample = this.fb.group({
			name: [
				'',
				[
					RxwebValidators.minLength({
						message: `number error`,
						value: 3,
					}),
				],
			],
		})
	}
	title = 'Custom HostComponent'
}

const cases = {
	simples: `
    <form [formGroup]="formExample">
      <hmv-select formControlName="name"></hmv-select>
    </form>
  `,
}

describe('SelectComponent', () => {
	let host: Spectator<SelectComponent>
	const createHost = createHostFactory({
		component: SelectComponent,
		host: CustomHostComponent,
		imports: [SharedModule],
		mocks: [NgForm],
	})

	it('should create', () => {
		host = createHost(cases.simples)

		expect(host.component).toBeTruthy()
	})
})
