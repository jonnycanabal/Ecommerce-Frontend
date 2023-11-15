package com.aplicativoEcommerce.app.services;

import java.util.Optional;

import com.aplicativoEcommerce.app.models.entity.Tienda;

public interface TiendaService {

	public Iterable<Tienda> findAll();
	
	public Optional<Tienda> findById(Long id);
	
	public Tienda save(Tienda tienda);
	
	public void deleteById(Long id);
}
