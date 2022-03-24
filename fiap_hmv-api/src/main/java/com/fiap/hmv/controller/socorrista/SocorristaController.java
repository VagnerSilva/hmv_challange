package com.fiap.hmv.controller.socorrista;

import com.fiap.hmv.repository.entity.Socorrista;
import com.fiap.hmv.service.SocorristaService;
import com.fiap.hmv.service.exception.ApiErrorException;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/socorrista")
public class SocorristaController {

    private final SocorristaService socorristaService;

    public SocorristaController(SocorristaService service) {
        socorristaService = service;
    }

    @ApiOperation(value = "Obter dados do socorrista")
    @GetMapping("{userId}")
    public ResponseEntity<Socorrista> buscaPorID(
            @PathVariable Integer userId) {
        try {
            var socorrista = socorristaService.findById(userId);
            return ResponseEntity.ok().body(socorrista.toResponse());
        } catch (ApiErrorException | NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header(e.getMessage()).build();
        }
    }


    @ApiOperation(value = "Cadastro socorrista")
    @PostMapping("register")
    public ResponseEntity<Socorrista> register(
            @RequestBody SocorristaRequest socorrista) {
        try {
            var newSocorrista = socorristaService.save(socorrista.toEntity());
            return ResponseEntity.ok().body(newSocorrista.toResponse());
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).header(e.getMessage()).build();
        }
    }


    @ApiOperation(value = "Cadastro socorrista")
    @PostMapping("update/{id}")
    public ResponseEntity<Socorrista> update(
            @PathVariable Integer id,
            @RequestBody SocorristaRequest socorrista) {
        try {
            var newSocorrista = socorristaService.update(id, socorrista);
            return ResponseEntity.ok().body(newSocorrista);
        } catch (ApiErrorException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).header(e.getMessage()).build();
        }
    }
}
