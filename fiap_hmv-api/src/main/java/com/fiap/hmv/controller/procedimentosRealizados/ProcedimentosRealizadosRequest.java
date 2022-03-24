package com.fiap.hmv.controller.procedimentosRealizados;


import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.repository.entity.ProcedimentosRealizados;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcedimentosRealizadosRequest {
    private Integer idSocorrista;

    private Paciente paciente;

    private Boolean respiracao;

    private String respiracaoObservacao;

    private Boolean pulso;

    private String pulsoObservacao;

    private Boolean pressaoArterialPA;

    private Boolean temperatura;

    private String medicamentoMinistrado;

    private String pacienteComPerdaDeConciencia;

    private String procedimentoCardiopulmonar;
    private String observacoes;

    public ProcedimentosRealizados toEntity() {
        return ProcedimentosRealizados.builder()
                .idSocorrista(getIdSocorrista())
                .paciente(getPaciente())
                .respiracao(getRespiracao())
                .respiracaoObservacao(getRespiracaoObservacao())
                .pulso(getPulso())
                .pulsoObservacao(getPulsoObservacao())
                .pressaoArterialPA(getPressaoArterialPA())
                .temperatura(getTemperatura())
                .medicamentoMinistrado(getMedicamentoMinistrado())
                .pacienteComPerdaDeConciencia(getPacienteComPerdaDeConciencia())
                .procedimentoCardiopulmonar(getProcedimentoCardiopulmonar())
                .observacoes(getObservacoes())
                .build();
    }

}