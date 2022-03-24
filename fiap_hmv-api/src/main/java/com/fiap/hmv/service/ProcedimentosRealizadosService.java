package com.fiap.hmv.service;

import com.fiap.hmv.repository.ProcedimentosRealizadosRepository;
import com.fiap.hmv.repository.entity.ProcedimentosRealizados;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProcedimentosRealizadosService {


    ProcedimentosRealizadosRepository repository;

    public ProcedimentosRealizadosService(ProcedimentosRealizadosRepository repo) {
        repository = repo;
    }

    public ProcedimentosRealizados findBySocorrista(Integer id) throws ApiErrorException {
        Optional<ProcedimentosRealizados> pr = Optional.ofNullable(repository.findByIdSocorrista(id));
        return pr.orElseThrow(() -> new ApiErrorException(HttpStatus.NOT_FOUND,
                "Item não encontrado."));
    }

    public ProcedimentosRealizados save(ProcedimentosRealizados pr) {
        return repository.save(pr);
    }
}
