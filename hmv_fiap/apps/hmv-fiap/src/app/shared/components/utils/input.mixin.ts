import { FormControl, FormGroupDirective, NgControl, NgForm } from "@angular/forms"
import { ErrorStateMatcher, mixinDisabled, mixinErrorState } from "@angular/material/core"

export class CustomErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control && form) {
			const isSubmitted = form.submitted
			return control.invalid && (control.dirty || control.touched || isSubmitted)
		}
		return false
	}
}

export class InputBase {
	constructor(
		public _parentFormGroup: FormGroupDirective,
		public _parentForm: NgForm,
		public _defaultErrorStateMatcher: ErrorStateMatcher,
		public ngControl: NgControl,
	) {}
}
export const InputBaseMixin = mixinDisabled(mixinErrorState(InputBase))
