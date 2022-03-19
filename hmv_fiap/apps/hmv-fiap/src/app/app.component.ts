import { Component } from '@angular/core'
import { required } from '@rxweb/reactive-form-validators'
import { Validator } from '@shared/validators'

class User {
	@required({
		message: Validator.msg.REQUIRED,
	})
	name!: string
}

@Component({
	selector: 'hmv-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'hmv-fiap'
}
