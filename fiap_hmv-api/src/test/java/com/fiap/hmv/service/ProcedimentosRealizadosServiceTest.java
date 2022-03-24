package com.fiap.hmv.service;


import com.fiap.hmv.controller.procedimentosRealizados.ProcedimentosRealizadosRequest;
import com.fiap.hmv.repository.ProcedimentosRealizadosRepository;
import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class ProcedimentosRealizadosServiceTest {
    ProcedimentosRealizadosService pr;
    Paciente paciente = new Paciente(44,"nome", 0, "alergia", "medicamento", "descricao");
    ProcedimentosRealizadosRequest newPr = new ProcedimentosRealizadosRequest(
            123456,
            paciente,
            true,
            "respiracaoObservacao",
            true,
            "pulsoObservacao",
            true,
            true,
            "medicamentoMinistrado",
            "pacienteComPerdaDeConciencia",
            "procedimentoCardiopulmonar",
            "observacoes"
    );

    @Mock
    ProcedimentosRealizadosRepository repository;

    AutoCloseable closeable;

    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
        pr = new ProcedimentosRealizadosService(repository);
    }

    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }


    @Test
    @DisplayName("Deve buscar socorrista por id")
    void findBySocorristaTest() throws ApiErrorException {
        when(repository.findByIdSocorrista(123456)).thenReturn(newPr.toEntity());
        var prc = pr.findBySocorrista(123456);
        assertThat(prc).isEqualTo(newPr.toEntity());
    }

    @Test
    @DisplayName("Deve retornar mensagem de \"Item nao encontrado\"")
    void findBySocorristaTest_notFound() {
        when(repository.findById(22)).thenReturn(Optional.empty());

        var exception =
                Assertions.assertThrows(ApiErrorException.class,() -> pr.findBySocorrista(22));
        assertEquals("Item não encontrado.", exception.getMessage());
    }

    @Test
    @DisplayName("Deve cadastrar  o procedimento")
    void cadastrarPacienteTest() {
        when(repository.save(newPr.toEntity())).thenReturn(newPr.toEntity());
        var prc = pr.save(newPr.toEntity());
        assertThat(prc).isEqualTo(newPr.toEntity());
    }

}
