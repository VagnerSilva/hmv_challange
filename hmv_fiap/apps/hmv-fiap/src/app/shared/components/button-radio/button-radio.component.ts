import {
	Attribute,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	Optional,
	Self,
	ViewEncapsulation,
} from '@angular/core'
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'
import { InputBaseComponent } from '../utils/input-base.component'

@Component({
	selector: 'hmv-button-radio',
	templateUrl: './button-radio.component.html',
	styleUrls: ['./button-radio.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonRadioComponent extends InputBaseComponent<ButtonRadioComponent> {
	@Input() options: any[] = []
	constructor(
		@Attribute(`labelName`) public labelName: string,
		@Attribute(`keyValue`) public keyValue: string,
		@Attribute(`keyLabel`) public keyLabel: string,
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
