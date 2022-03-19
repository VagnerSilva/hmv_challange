/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type SelectType = {
	id: string
	value: string
}

@Component({
	selector: 'hmv-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends InputBaseComponent<SelectComponent> {
	@Input() items: SelectType[] | Array<any> = []
	constructor(
		@Attribute(`labelName`) public labelName: string,
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
