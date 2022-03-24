package com.fiap.hmv.controler.procedimentosRealizados;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fiap.hmv.controller.procedimentosRealizados.ProcedimentosRealizadosController;
import com.fiap.hmv.controller.procedimentosRealizados.ProcedimentosRealizadosRequest;
import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.repository.entity.Socorrista;
import com.fiap.hmv.service.ProcedimentosRealizadosService;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = ProcedimentosRealizadosController.class)
public class ProcedimentosRealizadosTest {

    Paciente paciente = new Paciente(456789, "nome",0,"alergia","medicamento", "descricao");

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

    Socorrista socorrista = new Socorrista(123456, "nome", 0, true);
    @Autowired
    MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    ProcedimentosRealizadosService pr;
    @MockBean
    SocorristaService socorristaService;

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
    @DisplayName("Deve cadastrar procedimentos")
    void CadastrarPRTest() throws Exception {
        Mockito.when(socorristaService.findById(newPr.getIdSocorrista())).thenReturn(socorrista);
        Mockito.when(pr.save(newPr.toEntity())).thenReturn(newPr.toEntity().toResponse());
        var request = objectMapper.writeValueAsString(newPr);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/procedimentos/cadastro")
                        .contentType("application/json")
                        .content(request))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Deve retorna 404 para socorristas inativos")
    void CadastrarPR_Socorrista_Inativo_Test() throws Exception {
        socorrista.setAtivo(false);
        Mockito.when(socorristaService.findById(newPr.getIdSocorrista())).thenReturn(socorrista);
        Mockito.when(pr.save(newPr.toEntity())).thenReturn(newPr.toEntity().toResponse());
        var request = objectMapper.writeValueAsString(newPr);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/procedimentos/cadastro")
                        .contentType("application/json")
                        .content(request))
                .andExpect(status().isNotFound());
    }

}
