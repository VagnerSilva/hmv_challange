package com.fiap.hmv.repository.mapper;

import com.fiap.hmv.controller.socorrista.SocorristaRequest;
import com.fiap.hmv.repository.entity.Socorrista;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class SocorristaMapper {

    public static final SocorristaMapper INSTANCE = Mappers.getMapper(SocorristaMapper.class);

    public abstract Socorrista toSocorrista(SocorristaRequest socorrista);
}
