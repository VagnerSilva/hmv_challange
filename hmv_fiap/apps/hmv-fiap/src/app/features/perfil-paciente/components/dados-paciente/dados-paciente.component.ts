import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'
import { PacienteModel } from '@core/models/paciente.model'

@Component({
	selector: 'hmv-dados-paciente',
	templateUrl: './dados-paciente.component.html',
	styleUrls: ['./dados-paciente.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DadosPacienteComponent {
	@Input() paciente!: PacienteModel
}
