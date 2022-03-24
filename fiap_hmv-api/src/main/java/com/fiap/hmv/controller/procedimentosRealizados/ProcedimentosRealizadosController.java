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
    ProcedimentosRealizadosService pr;
    SocorristaService socorristaService;


    public ProcedimentosRealizadosController(ProcedimentosRealizadosService service, SocorristaService s) {
        pr = service;
        socorristaService = s;
    }

    @ApiOperation(value = "Relate do procedimento")
    @PostMapping("/cadastro")
    public ResponseEntity<Boolean> CadastrarPR(
            @RequestBody ProcedimentosRealizadosRequest newPR) {
        try {

            var socorrista =  socorristaService.findById(newPR.getIdSocorrista());
            var hasId = socorrista.getId().intValue() == newPR.getIdSocorrista().intValue();
            var isActive = socorrista.getAtivo();
            if(hasId && socorrista.getAtivo()) {
                pr.save(newPR.toEntity());
                return ResponseEntity.ok().body(true);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header(e.getMessage()).build();
        }
    }
}
