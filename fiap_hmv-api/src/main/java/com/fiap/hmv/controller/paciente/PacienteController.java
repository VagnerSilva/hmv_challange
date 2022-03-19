package com.fiap.hmv.controller.paciente;


import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.service.PacienteService;
import com.fiap.hmv.service.exception.ApiErrorException;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    PacienteService  pacienteService;

    public PacienteController(PacienteService service) {
        pacienteService = service;
    }

    @ApiOperation(value = "Buscar paciente")
    @GetMapping("{userId}")
    public ResponseEntity<Paciente> buscaPorID(
            @PathVariable Integer userId) {
        try {
            var newPaciente = pacienteService.findById(userId);
            return ResponseEntity.ok().body(newPaciente.toResponse());
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header(e.getMessage()).build();
        }
    }

    @ApiOperation(value = "Cadastro de paciente")
    @PostMapping("cadastro")
    public ResponseEntity<Paciente> register(
            @RequestBody PacienteRequest paciente) {
        try {
            var newPaciente = pacienteService.save(paciente.toEntity());
            return ResponseEntity.ok().body(newPaciente.toResponse());
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).header(e.getMessage()).build();
        }
    }
}
