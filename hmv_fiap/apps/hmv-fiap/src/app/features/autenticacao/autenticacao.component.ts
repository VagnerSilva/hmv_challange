import { Component, HostListener, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router'
import { ProcedimentoRealizadosRequest } from '@core/models/procedimentos-relizados.model'
import { ProcedimentosRealizadosService } from '@core/services/api/procedimentos-realizados.service'
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators'
import { ToastrService } from 'ngx-toastr'
import { DataService } from '../../core/services/data.service'

@Component({
	selector: 'hmv-autenticacao',
	templateUrl: './autenticacao.component.html',
	styleUrls: ['./autenticacao.component.scss'],
})
export class AutenticacaoComponent implements OnInit {
	authForm!: FormGroup
	procedimento!: ProcedimentoRealizadosRequest

	constructor(
		private _rxFB: RxFormBuilder,
		private _data: DataService,
		private _procedimentoSrv: ProcedimentosRealizadosService,
		private _toastr: ToastrService,
		private _router: Router,
	) {}

	show = false

	ngOnInit(): void {
		this.loadForm()
		this.disableBackButton()
	}

	private disableBackButton(): void {
		window.history.pushState(null, '', null)
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd && this.show) {
				window.history.pushState(null, '', null)
			}
		})
	}

	@HostListener('window:popstate', ['$event'])
	onPopState() {
		if (this.show) window.history.pushState(null, '', null)
	}

	loadForm() {
		this.authForm = this._rxFB.group({
			idSocorrista: [
				'',
				RxwebValidators.required({
					message: 'Campo obrigatório',
				}),
			],
		})
	}

	onSubmit() {
		if (this.authForm.invalid) {
			this.authForm.markAllAsTouched()
			return
		}
		this._data.storage = {
			idSocorrista: parseInt(this.authForm.get('idSocorrista')?.value),
		}
		this.procedimento = this._data.storage as ProcedimentoRealizadosRequest
		this._procedimentoSrv.cadastro(this.procedimento).subscribe({
			next: (status) => {
				status ? (this.show = true) : this._toastr.error('Usuário inativo', 'Erro ao cadastrar')
			},
			error: () => this._toastr.error('Usuário não encontrado', 'Erro ao cadastrar'),
		})
	}
}
