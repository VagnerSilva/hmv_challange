package com.fiap.hmv.controller.socorrista;


import com.fiap.hmv.repository.entity.Socorrista;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
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
