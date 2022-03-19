/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { RxFormBuilder } from '@rxweb/reactive-form-validators'
import { ProcedimentoRealizadoModel } from '../../core/models/procedimentos-relizados.model'
import { DataService } from '../../core/services/data.service'

@Component({
	selector: 'hmv-procedimentos-realizados',
	templateUrl: './procedimentos-realizados.component.html',
	styleUrls: ['./procedimentos-realizados.component.scss'],
})
export class ProcedimentosRealizadosComponent implements OnInit {
	pRealizadoForm!: FormGroup

	constructor(private _rxFB: RxFormBuilder, private _data: DataService, private _route: Router) {}

	ngOnInit(): void {
		this.loadForm()
		console.log(this._data.storage)
	}

	loadForm(): void {
		this.pRealizadoForm = this._rxFB.formGroup(ProcedimentoRealizadoModel)
	}
	onSubmit() {
		if (!this.pRealizadoForm.valid) {
			this.pRealizadoForm.markAllAsTouched()
			return
		}
		this._data.storage = this.pRealizadoForm.value
		this._route.navigate(['autentificar'])
	}

	resetValue(field: string, resetField: string) {
		const onField = this.pRealizadoForm.get(field)
		const obs = this.pRealizadoForm.get(resetField)
		const resetValue = () =>
			setTimeout(() => {
				if (obs?.disabled) {
					obs?.setValue('')
				}
			}, 50)
		onField?.valueChanges.subscribe({
			next: () => resetValue(),
		})
	}
}
