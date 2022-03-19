package com.fiap.hmv.repository.entity.base;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import io.swagger.models.auth.In;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.config.spi.ConfigurationService;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

public class IdGenerator implements IdentifierGenerator {
    public static final String START_ID = "startID";
    public static final String NAME_ID = "nameID";
    public static final String TABLE_NAME = "tableName";


    private Integer defaultValue;
    private String nameId;
    private String table;

    @Override
    public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
        IdentifierGenerator.super.configure(type, params, serviceRegistry);
        var t = type;
        var p = params;
        var s = serviceRegistry;

        final ConfigurationService configurationService = serviceRegistry.getService(
                ConfigurationService.class
        );

        String globalEntityIdentifierPrefix = configurationService.getSetting(
                "entity.identifier.prefix",
                String.class,
                "SEQ_"
        );

        defaultValue = Integer.parseInt(ConfigurationHelper.getString(
                START_ID,
                params,
                globalEntityIdentifierPrefix
        ));

        nameId = ConfigurationHelper.getString(
                NAME_ID,
                params,
                globalEntityIdentifierPrefix
        );

        table = ConfigurationHelper.getString(
                TABLE_NAME,
                params,
                globalEntityIdentifierPrefix
        );
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        Integer value = 0;
        try {
            var query = String.format("select MAX(%s) from %s", nameId, table);
            Connection connection = session.connection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            if(resultSet.next()) {
                Integer userId = resultSet.getInt(1) + 1;
               value = userId < defaultValue ?
                       defaultValue :
                       userId;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  value;
    }
}
