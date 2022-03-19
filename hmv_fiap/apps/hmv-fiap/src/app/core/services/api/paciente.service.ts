import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'apps/hmv-fiap/src/environments/environment'
import { Observable } from 'rxjs'
import { PacienteModel } from '../../models/paciente.model'

@Injectable({ providedIn: 'root' })
export class PacienteService {
	readonly apiURL: string
	constructor(private http: HttpClient) {
		this.apiURL = environment.URL
	}

	obterPaciente(userId: string): Observable<PacienteModel> {
		return this.http.get<PacienteModel>(`${this.apiURL}/paciente/${userId}`)
	}
}
