package com.fiap.hmv.repository;


import com.fiap.hmv.repository.entity.Socorrista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocorristaRepository extends JpaRepository<Socorrista, Integer> {}