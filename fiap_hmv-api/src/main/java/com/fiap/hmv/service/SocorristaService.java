package com.fiap.hmv.service;

import com.fiap.hmv.controller.socorrista.SocorristaRequest;
import com.fiap.hmv.repository.SocorristaRepository;
import com.fiap.hmv.repository.entity.Socorrista;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SocorristaService {

    private final SocorristaRepository repository;

    public SocorristaService(SocorristaRepository repo) {
        repository = repo;
    }

    public Socorrista findById(Integer id) throws ApiErrorException {
        Optional<Socorrista> socorrista = repository.findById(id);
        return socorrista.orElseThrow(() -> new ApiErrorException(HttpStatus.NOT_FOUND,
                "Usuário não encontrado."));
    }

    public Socorrista save(Socorrista socorrista) {
        return repository.save(socorrista);
    }

    public Socorrista update(Integer id, SocorristaRequest socorrista) {
        var updateSocorrista = findById(id);
        updateSocorrista.setIdade(socorrista.getIdade());
        updateSocorrista.setAtivo(socorrista.getAtivo());
        updateSocorrista.setNomeCompleto(socorrista.getNomeCompleto());
        return repository.save(updateSocorrista);
    }



    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
