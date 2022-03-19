import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { DataService } from '@core/services/data.service'
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators'

@Component({
	selector: 'hmv-hospital-destino',
	templateUrl: './hospital-destino.component.html',
	styleUrls: ['./hospital-destino.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HospitalDestinoComponent implements OnInit {
	hospitalForm!: FormGroup
	listaHospital = ['Hospital Moinho de Vento']

	constructor(
		private _rxFB: RxFormBuilder,
		private _data: DataService,
		private _route: Router,
		private _activeRouter: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.loadForm()
	}

	loadForm() {
		this.hospitalForm = this._rxFB.group({
			hospital: [null, RxwebValidators.required({ message: 'Campo obrigatório.' })],
		})
	}

	onSubmit() {
		const userId = this._activeRouter.snapshot.paramMap.get('userId')
		this._data.storage = this.hospitalForm.value

		this._route.navigate([`procedimentos/${userId}`])
	}
}
