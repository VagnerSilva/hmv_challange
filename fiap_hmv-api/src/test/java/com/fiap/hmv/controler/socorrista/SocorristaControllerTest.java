package com.fiap.hmv.controler.socorrista;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fiap.hmv.controller.socorrista.SocorristaController;
import com.fiap.hmv.repository.entity.Socorrista;
import com.fiap.hmv.service.SocorristaService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = SocorristaController.class)
public class SocorristaControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    SocorristaService socorristaService;

    AutoCloseable closeable;

    Socorrista socorrista =  new Socorrista(44,
            "nome",
            0,
            true);

    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void closeService() throws Exception {
        closeable.close();
    }

    @Test
    @DisplayName("Deve retorna dados do socorrista cadastrado")
    void buscaPorIDTest() throws Exception {
        Mockito.when(socorristaService.findById(44)).thenReturn(socorrista);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/socorrista/{userId}", 44))
                .andExpect(jsonPath("$.id").value(44))
                .andExpect(status().isOk());
    }


    @Test
    @DisplayName("Deve retorna 404 ao buscar id invalido.")
    void buscaPorID_NotFound_Test() throws Exception {
       Mockito.when(socorristaService.findById(20)).thenThrow(NullPointerException.class);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/socorrista/{userId}", 20))
                .andExpect(status().isNotFound());
    }

}
