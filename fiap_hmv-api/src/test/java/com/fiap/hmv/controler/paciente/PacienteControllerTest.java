package com.fiap.hmv.controler.paciente;

import com.fiap.hmv.controller.paciente.PacienteController;
import com.fiap.hmv.repository.entity.Paciente;

import com.fiap.hmv.service.PacienteService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;



@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = PacienteController.class)
public class PacienteControllerTest {
    @Autowired
    MockMvc mockMvc;


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


}
