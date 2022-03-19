package com.fiap.hmv.service;

import com.fiap.hmv.repository.PacienteRepository;
import com.fiap.hmv.repository.entity.Paciente;
import com.fiap.hmv.service.exception.ApiErrorException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository repository;

    public PacienteService(PacienteRepository repo) {
        repository = repo;
    }

    public Paciente findById(Integer id) throws ApiErrorException {
        Optional<Paciente> paciente = repository.findById(id);
        return paciente.orElseThrow(() -> new ApiErrorException(HttpStatus.NOT_FOUND,
                "Paciente não cadastrado"));
    }

    public Paciente save(Paciente paciente) {
        return repository.save(paciente);
    }

    public void update(final Integer id, final String alergia,
                       final String medicamentoUsoContinuo, final String descricao) {
       var pacienteRepository = findById(id);
            pacienteRepository.setAlergia(alergia);
            pacienteRepository.setMedicamentoUsoContinuo(medicamentoUsoContinuo);
            pacienteRepository.setDescricao(descricao);
            repository.save(pacienteRepository);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

}
