package com.fiap.hmv.controller.paciente;

import com.fiap.hmv.repository.entity.Paciente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PacienteRequest {
    private String nomePaciente;
    private Integer idade;
    private String alergia;
    private String medicamentoUsoContinuo;
    private String descricao;

    public Paciente toEntity() {
        return Paciente.builder()
                .nomePaciente(getNomePaciente())
                .idade(getIdade())
                .alergia(getAlergia())
                .medicamentoUsoContinuo(getMedicamentoUsoContinuo())
                .descricao(getDescricao())
                .build();
    }

}
