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
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field'
import { InputBaseComponent } from '../utils/input-base.component'

@Component({
	selector: 'hmv-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends InputBaseComponent<TextareaComponent> {
	constructor(
		@Attribute('labelName') public labelName: string,
		@Attribute('appearance') public appearance: MatFormFieldAppearance = 'fill',
		@Attribute('floatLabel') public floatLabel: FloatLabelType = 'auto',
		@Attribute('rows') public rows = 1,
		@Attribute('hint') public hint: string,
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
