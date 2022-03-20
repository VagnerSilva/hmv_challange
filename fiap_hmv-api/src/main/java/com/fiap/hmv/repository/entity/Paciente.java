package com.fiap.hmv.repository.entity;


import com.fiap.hmv.repository.entity.base.BaseEntity;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tb_paciente")
public class Paciente extends BaseEntity {

    @Id
    @GenericGenerator(
            name = "assigned-sequence",
            strategy = "com.fiap.hmv.repository.entity.base.IdGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "hibernate_sequence"),
                    @Parameter(name = "startID", value = "159263487"),
                    @Parameter(name = "nameID", value = "user_id"),
                    @Parameter(name = "tableName", value = "tb_paciente")
            }
    )
    @GeneratedValue(generator = "assigned-sequence", strategy = GenerationType.SEQUENCE)
    protected Integer userId;

    @Column(nullable = false)
    private String nomePaciente;

    @Column(nullable = false)
    private Integer idade;

    @Column()
    private String alergia;

    @Column()
    private String medicamentoUsoContinuo;

    @Column()
    private String descricao;


    public Paciente toResponse() {
        return Paciente.builder()
                .userId(getUserId())
                .nomePaciente(getNomePaciente())
                .idade(getIdade())
                .alergia(getAlergia())
                .medicamentoUsoContinuo(getMedicamentoUsoContinuo())
                .descricao(getDescricao())
                .build();
    }

}
