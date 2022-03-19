/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-input-rename */
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import {
	ChangeDetectorRef,
	Component,
	DoCheck,
	ElementRef,
	forwardRef,
	HostBinding,
	Input,
} from '@angular/core'
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatFormFieldControl } from '@angular/material/form-field'
import { Subject } from 'rxjs'
import { CustomErrorStateMatcher, InputBaseMixin } from './input.mixin'

@Component({
	template: '',
	styles: [
		`
			span {
				opacity: 0;
				transition: opacity 200ms;
			}
			:host.floating span {
				opacity: 1;
			}
		`,
	],
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: forwardRef(() => InputBaseComponent),
			multi: true,
		},
		{
			provide: ErrorStateMatcher,
			useClass: CustomErrorStateMatcher,
		},
	],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class InputBaseComponent<T>
	extends InputBaseMixin
	implements MatFormFieldControl<T>, ControlValueAccessor, DoCheck
{
	static nextId = 0
	private _placeholder = ''
	private _required = false
	private _disabled = false
	autofilled = false
	controlType = ''
	value!: T | null
	focused = false
	touched = false

	override stateChanges = new Subject<void>()

	@HostBinding() id = `input-${InputBaseComponent.nextId++}`
	@Input('aria-describedby') userAriaDescribedBy = ''

	@Input()
	get placeholder() {
		return this._placeholder
	}
	set placeholder(plh) {
		this._placeholder = plh
		this.stateChanges.next()
	}

	@Input()
	get required() {
		return this._required
	}
	set required(req) {
		this._required = coerceBooleanProperty(req)
		this.stateChanges.next()
	}

	@Input()
	override get disabled(): boolean {
		return this._disabled
	}
	override set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value)
		// this._disabled ? this.parts.disable() : this.parts.enable();
		this.stateChanges.next()
	}

	get empty() {
		return !this.value
	}

	// override get errorState(): boolean {
	// 	// this.parts.invalid &&
	// 	return this.touched
	// }

	onTouched = () => {}
	onChanged = () => {}

	constructor(
		private _elementRef: ElementRef,
		public parentFormGroup: FormGroupDirective,
		public parentForm: NgForm,
		public defaultErrorStateMatcher: ErrorStateMatcher,
		public override ngControl: NgControl,
		public cdr: ChangeDetectorRef,
	) {
		super(parentFormGroup, parentForm, defaultErrorStateMatcher, ngControl)

		this.controlType = this._elementRef.nativeElement.tagName.toLocaleLowerCase()
		// Replace the provider from above with this.
		if (this.ngControl != null) {
			// Setting the value accessor directly (instead of using
			// the providers) to avoid running into a circular import.
			this.ngControl.valueAccessor = this
		}
	}

	ngDoCheck(): void {
		if (this.ngControl.control) {
			this.updateErrorState()
			this.cdr.detectChanges()
		}
	}

	@HostBinding('class.floating')
	get shouldLabelFloat() {
		return this.focused || !this.empty
	}

	writeValue(obj: any): void {
		this.value = obj
	}

	registerOnChange(fn: any): void {
		this.onChanged = fn
	}

	registerOnTouched(fn: any): void {
		this.touched = fn
	}

	setDescribedByIds(ids: string[]): void {
		const controlElement = this._elementRef.nativeElement.querySelector('.input-container')
		controlElement.setAttribute('aria-describedby', ids.join(' '))
	}

	onContainerClick(event: MouseEvent) {
		if ((event.target as Element).tagName.toLowerCase() != 'input') {
			this._elementRef.nativeElement.querySelector('input').focus()
		}
	}

	onFocusIn(event: FocusEvent) {
		if (!this.focused) {
			this.focused = true
			this.stateChanges.next()
		}
	}

	onFocusOut(event: FocusEvent) {
		if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
			this.touched = true
			this.focused = false
			this.onTouched()
			this.stateChanges.next()
		}
	}
}
