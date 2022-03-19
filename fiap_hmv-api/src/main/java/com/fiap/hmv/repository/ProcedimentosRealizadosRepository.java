package com.fiap.hmv.repository;


import com.fiap.hmv.repository.entity.ProcedimentosRealizados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProcedimentosRealizadosRepository extends JpaRepository<ProcedimentosRealizados, Integer> {

    public ProcedimentosRealizados findByIdSocorrista(Integer idSocorrista);
}