package com.fiap.hmv.repository.entity.base;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;

@MappedSuperclass
public class BaseEntity {


    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private String createdAt = Date.from(Instant.now()).toString();

    @LastModifiedDate
    @Column(name = "updated_at")
    private String updatedAt = Date.from(Instant.now()).toString();;

}
