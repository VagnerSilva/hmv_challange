import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ProcedimentoRealizadosRequest } from '@core/models/procedimentos-relizados.model'
import { environment } from 'apps/hmv-fiap/src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ProcedimentosRealizadosService {
	readonly apiURL: string
	constructor(private http: HttpClient) {
		this.apiURL = environment.URL
	}

	cadastro(procedimento: ProcedimentoRealizadosRequest): Observable<boolean> {
		return this.http.post<boolean>(`${this.apiURL}/procedimentos/cadastro`, procedimento)
	}
}
