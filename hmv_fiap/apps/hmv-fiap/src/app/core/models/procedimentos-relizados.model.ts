import { AbstractControl } from '@angular/forms'
import { disable, prop, required } from '@rxweb/reactive-form-validators'
import { PacienteModel } from './paciente.model'

export class ProcedimentoRealizadoModel {
	@prop()
	respiracao = false

	@disable({
		conditionalExpression: function (control: AbstractControl, pr: ProcedimentoRealizadoModel) {
			return pr.respiracao === false || null
		},
	})
	@prop()
	respiracaoObservacao = ''

	@prop()
	pulso = false

	@disable({
		conditionalExpression: function (control: AbstractControl, pr: ProcedimentoRealizadoModel) {
			return pr.pulso === false || null
		},
	})
	@prop()
	pulsoObservacao = ''

	@prop()
	pressaoArterialPA = false

	@prop()
	temperatura = false

	@required({
		message: 'Campo obrigatório',
	})
	@prop()
	medicamentoMinistrado!: 'Sim' | 'Não'

	@required({
		message: 'Campo obrigatório',
	})
	@prop()
	pacienteComPerdaDeConciencia!: 'Sim' | 'Não'

	@required({
		message: 'Campo obrigatório',
	})
	@prop()
	procedimentoCardiopulmonar!: 'Sim' | 'Não'

	@prop()
	observacoes = ''
}

export interface ProcedimentoRealizadosRequest {
	idSocorrista: number
	medicamentoMinistrado: string
	observacoes: string
	paciente: PacienteModel
	pacienteComPerdaDeConciencia: string
	pressaoArterialPA: boolean
	procedimentoCardiopulmonar: string
	pulso: boolean
	pulsoObservacao: string
	respiracao: boolean
	respiracaoObservacao: string
	temperatura: boolean
}
