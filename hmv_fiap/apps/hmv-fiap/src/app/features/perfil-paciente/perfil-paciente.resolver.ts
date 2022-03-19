import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { PacienteModel } from '@core/models/paciente.model'
import { PacienteService } from '@core/services/api/paciente.service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class PerfilPacienteResolver implements Resolve<PacienteModel> {
	constructor(private service: PacienteService) {}
	resolve(route: ActivatedRouteSnapshot): Observable<PacienteModel> {
		return this.service.obterPaciente(route.paramMap.get('userId') as string)
	}
}
