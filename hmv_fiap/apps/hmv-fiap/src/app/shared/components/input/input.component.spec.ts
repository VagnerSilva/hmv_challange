/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core'
import { fakeAsync } from '@angular/core/testing'
import { FormBuilder, FormGroup, NgForm, ValidationErrors } from '@angular/forms'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { InputComponent } from './input.component'

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
      <hmv-input formControlName="name"></hmv-input>
    </form>
  `,
	placeholder: `
  <form [formGroup]="formExample">
   <hmv-input formControlName="name" placeholder="fullname" ></hmv-input>
  </form>
  `,
	rightIcon: `
  <form [formGroup]="formExample">
   <hmv-input formControlName="name" placeholder="fullname" >
    <mat-icon matPrefix class="my-icon">person</mat-icon>
   </hmv-input>
  </form>
  `,
	hint: `
  <form [formGroup]="formExample">
   <hmv-input formControlName="name" placeholder="fullname" hint="hint_text" >
    <mat-icon matSuffix class="my-icon">person</mat-icon>
   </hmv-input>
  </form>
  `,
}

function formManager(host: SpectatorHost<InputComponent, CustomHostComponent>): {
	value: () => any
	valid: () => boolean
	errors: () => ValidationErrors | null | undefined
	touched: () => boolean
} {
	const form = host.hostComponent.formExample
	return {
		value: () => form.value,
		valid: () => form.valid,
		errors: () => form.get(`name`)?.errors,
		touched: () => form.touched,
	}
}

describe('InputComponent', () => {
	let host: SpectatorHost<InputComponent, CustomHostComponent>
	const createHost = createHostFactory({
		component: InputComponent,
		host: CustomHostComponent,
		imports: [SharedModule],
		mocks: [NgForm],
	})

	it('should display the host component input', fakeAsync(async () => {
		host = createHost(cases.simples)
		const input = host.query<HTMLInputElement>('input') as HTMLInputElement

		expect(input).toExist()

		host.typeInElement('name', input)

		const form = formManager(host)
		expect(form.value().name).toBe('name')
		expect(form.valid).toBeTruthy()

		host.typeInElement('na', input)
		expect(form.valid()).not.toBeTruthy()
		expect(host.hostFixture).toMatchSnapshot()
	}))

	it('should display placeholder', fakeAsync(async () => {
		host = createHost(cases.placeholder)
		const input = host.query<HTMLInputElement>('input') as HTMLInputElement
		expect(input).toHaveAttribute('data-placeholder', 'fullname')
		expect(host.hostFixture).toMatchSnapshot()
	}))

	it('Shows right icon', fakeAsync(async () => {
		host = createHost(cases.rightIcon)
		const icon = host.query(`mat-icon`)
		expect(icon).toHaveAttribute('matPrefix', '')
		expect(host.hostFixture).toMatchSnapshot()
	}))

	it('shows hint text', fakeAsync(async () => {
		host = createHost(cases.hint)
		const icon = host.query(`mat-icon`)
		const hint = host.query('mat-hint')
		expect(icon).toHaveAttribute('matSuffix', '')
		expect(hint).toHaveExactText('hint_text')
		expect(host.hostFixture).toMatchSnapshot()
	}))

	it('Show error message', fakeAsync(async () => {
		host = createHost(cases.hint)
		const input = host.query<HTMLInputElement>('input') as HTMLInputElement
		expect(input).toExist()
		host.typeInElement('na', input)
		const form = formManager(host)
		expect(form.errors()).not.toBeNull()
	}))
})
