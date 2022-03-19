package com.fiap.hmv.repository.entity;

import com.fiap.hmv.repository.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tb_socorrista")
public class Socorrista extends BaseEntity {

    @Id
    @GenericGenerator(
            name = "assigned-sequence",
            strategy = "com.fiap.hmv.repository.entity.base.IdGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "hibernate_sequence"),
                    @Parameter(name = "startID", value = "124578"),
                    @Parameter(name = "nameID", value = "id"),
                    @Parameter(name = "tableName", value = "tb_socorrista")
            }
    )
    @GeneratedValue(generator = "assigned-sequence", strategy = GenerationType.SEQUENCE)
    protected Integer id;

    private String nomeCompleto;
    private Integer idade;
    private Boolean ativo;

    public Socorrista toResponse() {
        return Socorrista.builder()
                .id(getId())
                .nomeCompleto(getNomeCompleto())
                .ativo(getAtivo())
                .build();
    }

}
