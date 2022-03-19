import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { ButtonRadioComponent } from './components/button-radio/button-radio.component'
import { ButtonComponent } from './components/button/button.component'
import { InputComponent } from './components/input/input.component'
import { SelectComponent } from './components/select/select.component'
import { TextareaComponent } from './components/textarea/textarea.component'
import { MaterialModule } from './material/material.module'

const components = [
	ButtonComponent,
	InputComponent,
	SelectComponent,
	TextareaComponent,
	ButtonRadioComponent,
]

const modules = [MaterialModule, ReactiveFormsModule]

@NgModule({
	declarations: [...components],
	imports: [CommonModule, ...modules],
	exports: [...components, ...modules, RxReactiveFormsModule],
})
export class SharedModule {}
