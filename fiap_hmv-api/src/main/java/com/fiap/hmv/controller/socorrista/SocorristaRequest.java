package com.fiap.hmv.controller.socorrista;

import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.repository.entity.Socorrista;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SocorristaRequest {
    private String nomeCompleto;
    private Integer idade;
    private Boolean ativo;

    public Socorrista  toEntity() {
        return Socorrista.builder()
                .nomeCompleto(getNomeCompleto())
                .idade(getIdade())
                .ativo(getAtivo())
                .build();
    }

}
