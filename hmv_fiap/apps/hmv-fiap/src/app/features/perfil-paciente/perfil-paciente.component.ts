import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PacienteModel } from '@core/models/paciente.model'
import { DataService } from '@core/services/data.service'

export type PefilType = {
	id: number
	nome: string
}

@Component({
	selector: 'hmv-perfil-paciente',
	templateUrl: './perfil-paciente.component.html',
	styleUrls: ['./perfil-paciente.component.scss'],
})
export class PerfilPacienteComponent {
	readonly paciente: PacienteModel

	constructor(private _activeRouter: ActivatedRoute, private _data: DataService) {
		this.paciente = this._activeRouter.snapshot.data['paciente']
		this._data.storage = {
			paciente: this.paciente,
		}
	}
}
