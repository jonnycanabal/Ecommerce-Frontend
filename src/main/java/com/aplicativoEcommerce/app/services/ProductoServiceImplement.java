// Esta Clase seria un contrato con la interfaz que se creo -ProductoService-


package com.aplicativoEcommerce.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aplicativoEcommerce.app.models.entity.Producto;
import com.aplicativoEcommerce.app.models.repository.ProductoRepository;



@Service
public class ProductoServiceImplement implements ProductoService {
	
	//inyectar el repository para usarlo en los metodos.
	@Autowired
	private ProductoRepository repository;
	
	@Override
	@Transactional (readOnly = true) //Importante marcar con Transaccional los metodos de consulta de Springframework
	public Iterable<Producto> findAll() {
	
		return repository.findAll();
	}

	@Override
	@Transactional (readOnly = true)
	public Optional<Producto> findById(Long id) {
		
		return repository.findById(id);
	}

	@Override
	@Transactional
	public Producto save(Producto producto) {
		
		return repository.save(producto);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {

		repository.deleteById(id);
	}


    @Autowired
    public ProductoServiceImplement(ProductoRepository productoRepository) {
        this.repository = productoRepository;
    }
	
	public List<Producto> getProductosPorTienda(Long tiendaId){
		return repository.findByTiendaId(tiendaId);
	}

	@Override
	public List<Producto> getProductosConTienda() {
		return (List<Producto>) repository.findAll();
	}
}
