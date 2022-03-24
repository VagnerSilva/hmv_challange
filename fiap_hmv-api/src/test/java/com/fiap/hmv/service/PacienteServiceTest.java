package com.fiap.hmv.service;

import com.fiap.hmv.repository.PacienteRepository;
import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;



import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PacienteServiceTest {

    PacienteService pacienteService;
    Paciente paciente = new Paciente(44,"nome", 0, "alergia", "medicamento", "descricao");

    @Mock
    PacienteRepository pacienteRepository;

    AutoCloseable closeable;

    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
        pacienteService = new PacienteService(pacienteRepository);
    }

    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }

    @Test
    @DisplayName("Deve localizar paciente por id")
    void findById() {
        when(pacienteRepository.findById(paciente.getUserId())).thenReturn(Optional.of(paciente));
        var pac = pacienteService.findById(44);
        assertThat(pac).isEqualTo(paciente);
    }


    @Test
    @DisplayName("Deve retornar mensagem de \"Paciente nao cadastrado\"")
    void findById_notFound() {
        when(pacienteRepository.findById(22)).thenReturn(Optional.ofNullable(null));
        var exception =  Assertions.assertThrows(ApiErrorException.class,() -> {
            pacienteService.findById(22);
        });
        assertEquals("Paciente não cadastrado", exception.getMessage());
    }

    @Test
    @DisplayName("Deve cadastrar paciente")
    void cadastrarPacienteTest() {
        when(pacienteRepository.save(paciente)).thenReturn(paciente);
        var pac = pacienteService.save(paciente);
        assertThat(pac).isEqualTo(paciente);
    }


    @Test
    @DisplayName("Deve atualizar dados do  paciente")
    void updateTest() {
        when(pacienteRepository.findById(44)).thenReturn(Optional.of(paciente));
        when(pacienteRepository.save(paciente)).thenReturn(paciente);
        var pac = pacienteService.update(44, "alergia2", "medicamento2", "descricao2");

        assertEquals(pac.getAlergia(), paciente.getAlergia());
    }


    @Test
    @DisplayName("Deve falha ao atualizar dados do paciente com id invalido")
    void update_error_Test() {
        when(pacienteRepository.findById(44)).thenReturn(Optional.empty());
        var exception =  Assertions.assertThrows(ApiErrorException.class,() -> {
            pacienteService.update(44, "alergia2", "medicamento2", "descricao2");
        });
        assertEquals("Paciente não cadastrado", exception.getMessage());
    }
}
