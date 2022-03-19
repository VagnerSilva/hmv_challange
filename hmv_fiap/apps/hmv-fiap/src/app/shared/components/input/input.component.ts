import {
	Attribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Optional,
	Self,
	ViewEncapsulation,
} from '@angular/core'
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { MatFormFieldAppearance } from '@angular/material/form-field'
import { InputType } from '../types'
import { InputBaseComponent } from '../utils/input-base.component'

@Component({
	selector: 'hmv-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends InputBaseComponent<InputComponent> {
	constructor(
		@Attribute(`labelName`) public labelName: string,
		@Attribute('appearance') public appearance: MatFormFieldAppearance = 'fill',
		@Attribute('hint') public hint: string,
		@Attribute('type') public type: InputType,
		@Optional() @Self() public override readonly ngControl: NgControl,
		@Optional() public override readonly parentFormGroup: FormGroupDirective,
		@Optional() public override readonly parentForm: NgForm,
		public readonly elementRef: ElementRef,
		public override readonly defaultErrorStateMatcher: ErrorStateMatcher,
		public override cdr: ChangeDetectorRef,
	) {
		super(elementRef, parentFormGroup, parentForm, defaultErrorStateMatcher, ngControl, cdr)
	}
}
