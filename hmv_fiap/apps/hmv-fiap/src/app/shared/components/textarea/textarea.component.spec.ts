import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, FormGroup, NgForm } from '@angular/forms'
import { byPlaceholder, createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'
import { RxwebValidators } from '@rxweb/reactive-form-validators'
import { SharedModule } from '@shared/shared.module'
import { TextareaComponent } from './textarea.component'

const cases = {
	simples: `
    <form [formGroup]="formExample">
      <hmv-textarea formControlName="text"></hmv-textarea>
    </form>
  `,
	placeholder: `
  <form [formGroup]="formExample">
   <hmv-textarea formControlName="text" placeholder="test" ></hmv-textarea>
  </form>
  `,
	labelName: `
  <form [formGroup]="formExample">
   <hmv-textarea labelName="my label" formControlName="text" placeholder="test" hint="hint_text" >
   </hmv-textarea>
  </form>
  `,
	rows: `
  <form [formGroup]="formExample">
   <hmv-textarea labelName="my label" rows="4" formControlName="text" placeholder="test" hint="hint_text" >
   </hmv-textarea>
  </form>
  `,
	text: 'Textarea Textarea',
}

@Component({ template: '' })
class CustomHostComponent {
	formExample!: FormGroup

	constructor(private fb: FormBuilder) {
		this.formExample = this.fb.group({
			text: [
				cases.text,
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

describe('TextareaComponent', () => {
	let host: SpectatorHost<TextareaComponent, CustomHostComponent>
	const createHost = createHostFactory({
		component: TextareaComponent,
		host: CustomHostComponent,
		imports: [SharedModule],
		mocks: [NgForm],
	})

	it('Should create component', () => {
		host = createHost(cases.simples)
		const form: AbstractControl = host.hostComponent.formExample.get('text') as AbstractControl
		expect(form.value).toEqual(cases.text)
		expect(host).toBeTruthy()
	})

	it('Should add default text', () => {
		host = createHost(cases.simples)
		const textarea = host.component.elementRef.nativeElement.querySelector(
			'textarea',
		) as HTMLTextAreaElement
		expect(textarea.value).toEqual(cases.text)
	})

	it('Display placeholder and label', () => {
		host = createHost(cases.labelName)
		const textarea = host.query(byPlaceholder(`test`)) as HTMLTextAreaElement
		expect(textarea.value).toEqual(cases.text)
		expect(textarea.placeholder).toBeTruthy()
		expect(host.element.innerHTML).toContain(`label`)
	})

	it('should change rows', () => {
		host = createHost(cases.rows)
		const textarea = host.query(byPlaceholder(`test`)) as HTMLTextAreaElement
		expect(textarea.value).toEqual(cases.text)
		expect(textarea.placeholder).toBeTruthy()
		expect(host.element.innerHTML).toContain(`label`)
		expect(textarea.rows).toEqual(4)
	})
})
