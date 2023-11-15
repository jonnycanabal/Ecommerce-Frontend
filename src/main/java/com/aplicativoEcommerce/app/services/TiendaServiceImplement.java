package com.aplicativoEcommerce.app.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.aplicativoEcommerce.app.models.entity.Tienda;
import com.aplicativoEcommerce.app.models.repository.TiendaRepository;

@Service
public class TiendaServiceImplement implements TiendaService {

	//inyectar el repository para usarlo en los metodos.
	@Autowired
	private TiendaRepository repository;
	
	@Override
	@Transactional (readOnly = true) //Importante marcar con Transaccional los metodos de consulta de Springframework
	public Iterable<Tienda> findAll() {
	
		return repository.findAll();
	}

	@Override
	@Transactional (readOnly = true)
	public Optional<Tienda> findById(Long id) {
		
		return repository.findById(id);
	}

	@Override
	@Transactional
	public Tienda save(Tienda tienda) {
		
		return repository.save(tienda);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {

		repository.deleteById(id);
	}

}
