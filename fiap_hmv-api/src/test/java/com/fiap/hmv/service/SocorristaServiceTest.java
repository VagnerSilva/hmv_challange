package com.fiap.hmv.service;


import com.fiap.hmv.controller.socorrista.SocorristaRequest;
import com.fiap.hmv.repository.SocorristaRepository;
import com.fiap.hmv.repository.entity.Socorrista;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class SocorristaServiceTest {
    SocorristaService socorristaService;

    Socorrista socorrista =  new Socorrista(123456,
            "nome",
            0,
            true);

    @Mock
    SocorristaRepository socorristaRepository;

    AutoCloseable closeable;

    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
        socorristaService = new SocorristaService(socorristaRepository);
    }

    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }

    @Test
    @DisplayName("Deve localizar paciente por id")
    void findById() {
        when(socorristaRepository.findById(123456)).thenReturn(Optional.of(socorrista));
        var scrt = socorristaService.findById(123456);
        assertThat(scrt).isEqualTo(socorrista);
    }


    @Test
    @DisplayName("Deve retornar mensagem de \"Usuário nao encontrado.\"")
    void findById_notFound() {
        when(socorristaRepository.findById(22)).thenReturn(Optional.empty());

        var exception =
                Assertions.assertThrows(ApiErrorException.class,() -> socorristaService.findById(22));
        assertEquals("Usuário não encontrado.", exception.getMessage());
    }


    @Test
    @DisplayName("Deve cadastrar paciente")
    void cadastrarSocorristaTest() {
        when(socorristaRepository.save(socorrista)).thenReturn(socorrista);
        var soc = socorristaService.save(socorrista);
        assertThat(soc).isEqualTo(socorrista);
    }


    @Test
    @DisplayName("Deve atualizar dados do socorrista")
    void updateTest() {
        var soc = new SocorristaRequest("nome", 0, true);
        when(socorristaRepository.findById(123456)).thenReturn(Optional.of(socorrista));
        when(socorristaRepository.save(socorrista)).thenReturn(socorrista);
        var socr = socorristaService.update(123456, soc);

        assertEquals(socr.getNomeCompleto(), socorrista.getNomeCompleto());
    }

    @Test
    @DisplayName("Deve falha ao atualizar socorrista invalido")
    void update_error_Test() {
        var soc = new SocorristaRequest("nome", 0, true);
        when(socorristaRepository.findById(123456)).thenReturn(Optional.empty());

        var exception =
                Assertions.assertThrows(ApiErrorException.class,() -> socorristaService.update(123456, soc));
        assertEquals("Usuário não encontrado.", exception.getMessage());
    }

}
