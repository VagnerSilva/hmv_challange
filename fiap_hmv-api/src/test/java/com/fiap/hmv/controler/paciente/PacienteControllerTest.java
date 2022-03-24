package com.fiap.hmv.controler.paciente;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fiap.hmv.controller.paciente.PacienteController;
import com.fiap.hmv.controller.paciente.PacienteRequest;
import com.fiap.hmv.repository.entity.Paciente;

import com.fiap.hmv.service.PacienteService;
import com.fiap.hmv.service.PacienteServiceTest;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = PacienteController.class)
public class PacienteControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @MockBean
    PacienteService pacienteService;
    AutoCloseable closeable;

    @BeforeEach
    void initService() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void closeService() throws Exception {
       closeable.close();
    }

    @Test
    @DisplayName("Deve retornar os dados do paciente cadastrado")
    void buscaPorIDTest() throws Exception {
       Paciente paciente =  new Paciente(44,
                "nome",
                0,
                "alergia",
                "uso medicamento",
                "descricao");

        Mockito.when(pacienteService.findById(44)).thenReturn(paciente);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/paciente/{userId}", 44))
                .andExpect(jsonPath("$.userId").value(44))
                .andExpect(status().isOk());
    }


    @Test
    @DisplayName("Deve retornar 404 quando nao encontra paciente cadastrado")
    void buscaPorID_NotFound_Test() throws Exception {

        Mockito.when(pacienteService.findById(20)).thenThrow(NullPointerException.class);
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/paciente/{userId}", 20))
                .andExpect(status().isNotFound());
    }


    @Test
    @DisplayName("Deve cadastrar paciente ")
    void cadastrarTest() throws Exception {
            var paciente =  new PacienteRequest(
                    "nome",
                    0,
                    "alergia",
                    "uso medicamento",
                    "descricao").toEntity();

            Mockito.when(pacienteService.save(paciente)).thenReturn(paciente.toResponse());

            mockMvc.perform(MockMvcRequestBuilders
                            .post("/paciente/cadastro")
                    .contentType("application/json")
                            .content(objectMapper.writeValueAsString(paciente)))
                    .andExpect(content().string("{\"userId\":null,\"nomePaciente\":\"nome\",\"idade\":0,\"alergia\":\"alergia\",\"medicamentoUsoContinuo\":\"uso medicamento\",\"descricao\":\"descricao\"}"))
                    .andExpect(status().isOk());
        }


}
