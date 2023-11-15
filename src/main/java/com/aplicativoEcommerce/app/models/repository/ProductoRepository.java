package com.aplicativoEcommerce.app.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.aplicativoEcommerce.app.models.entity.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p WHERE p.tienda.id = :tiendaId")
    List<Producto> findByTiendaId(@Param("tiendaId") Long tiendaId);
}
