package com.aplicativoEcommerce.app.services;

import java.util.List;
import java.util.Optional;

import com.aplicativoEcommerce.app.models.entity.Producto;

public interface ProductoService {
	
	public Iterable<Producto> findAll();
	
	public Optional<Producto> findById(Long id);
	
	public Producto save(Producto producto);
	
	public void deleteById(Long id);

	public List<Producto> getProductosPorTienda(Long tiendaId);

	public List<Producto> getProductosConTienda();

}
