package com.fiap.hmv.controller.procedimentosRealizados;

import com.fiap.hmv.service.ProcedimentosRealizadosService;
import com.fiap.hmv.service.SocorristaService;
import com.fiap.hmv.service.exception.ApiErrorException;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/procedimentos")
public class ProcedimentosRealizadosController {
    private final ProcedimentosRealizadosService pr;
    private final SocorristaService socorristaService;


    public ProcedimentosRealizadosController(ProcedimentosRealizadosService service, SocorristaService s) {
        pr = service;
        socorristaService = s;
    }

    @ApiOperation(value = "Relato do procedimento")
    @PostMapping("/cadastro")
    public ResponseEntity<Boolean> createPR(
            @RequestBody ProcedimentosRealizadosRequest newPR) {
        try {

            var socorrista =  socorristaService.findById(newPR.getIdSocorrista());
            if(socorrista.getId() == newPR.getIdSocorrista() && socorrista.getAtivo()) {
                pr.save(newPR.toEntity());
                return ResponseEntity.ok().body(true);
            }
            return ResponseEntity.ok().body(false);
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header(e.getMessage()).build();
        }
    }
}
