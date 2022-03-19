package com.fiap.hmv.repository.entity;

import com.fiap.hmv.repository.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tb_procedimentosRealizados")
public class ProcedimentosRealizados extends BaseEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="organisationSeq")
    @SequenceGenerator(name="organisationSeq", sequenceName="organisation_seq", allocationSize=7)
    private Integer id;

    @Column(nullable = false)
    private Integer idSocorrista;

    @OneToOne()
    @JoinColumn(name = "userId")
    private Paciente paciente;

    @Column()
    private Boolean respiracao;
    @Column()
    private String respiracaoObservacao;

    @Column()
    private Boolean pulso;
    @Column()
    private String pulsoObservacao;

    @Column()
    private Boolean pressaoArterialPA;
    @Column()
    private Boolean temperatura;
    @Column()
    private String medicamentoMinistrado;
    @Column()
    private String pacienteComPerdaDeConciencia;
    @Column()
    private String procedimentoCardiopulmonar;
    @Column()
    private String observacoes;

    public ProcedimentosRealizados toResponse() {
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
