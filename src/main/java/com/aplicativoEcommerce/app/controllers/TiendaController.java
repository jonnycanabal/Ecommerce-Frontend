package com.aplicativoEcommerce.app.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aplicativoEcommerce.app.models.entity.Producto;
import com.aplicativoEcommerce.app.models.entity.Tienda;

import com.aplicativoEcommerce.app.services.TiendaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class TiendaController {

	@GetMapping("/tienda/uploads/img/{id}")
	@CrossOrigin
	public ResponseEntity<?> verFoto(@PathVariable Long id){
		
		Optional<Tienda> o = service.findById(id);
		if (o.isEmpty() || o.get().getFoto() == null) {
			return ResponseEntity.notFound().build();
		}
		
		Resource imagen = new ByteArrayResource(o.get().getFoto());
		
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen);
	}
	
	
	@Autowired
	private TiendaService service;

	@GetMapping("/tienda") // dar una ruta URL
	@CrossOrigin
	public ResponseEntity<?> listar() {
		return ResponseEntity.ok().body(service.findAll());
	}

	@GetMapping("/tienda/ver/{id}")
	@CrossOrigin
	public ResponseEntity<?> ver(@PathVariable Long id) {

		Optional<Tienda> t = service.findById(id);
		if (t.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(t.get());
	}

	@PostMapping("/tienda/crear")
	@CrossOrigin
	public ResponseEntity<?> crear(@RequestBody Tienda tienda) {
		Tienda productodb = service.save(tienda);
		return ResponseEntity.status(HttpStatus.CREATED).body(productodb);

	}

	@PutMapping("/tienda/editar/{id}")
	@CrossOrigin
	public ResponseEntity<?> editar(@RequestBody Tienda tienda, @PathVariable Long id) {

		Optional<Tienda> t = service.findById(id);

		if (t.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Tienda tiendadb = t.get();
		tiendadb.setNombre(tienda.getNombre());

		return ResponseEntity.status(HttpStatus.OK).body(service.save(tiendadb));
	}

	@DeleteMapping("/tienda/eliminar/{id}")
	@CrossOrigin
	public ResponseEntity<?> eliminar(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	protected ResponseEntity<?> validar(BindingResult result) {
		Map<String, Object> errores = new HashMap<>();
		result.getFieldErrors().forEach(err -> {
			errores.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
		});
		return ResponseEntity.badRequest().body(errores);
	}
	
	
	@PutMapping("/tienda/{id}/asignar-productos")
	@CrossOrigin
	public ResponseEntity<?> asignarProductos(@RequestBody List<Producto> productos, @PathVariable Long id){
		Optional<Tienda> t = this.service.findById(id);
		if(!t.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Tienda dbTienda = t.get();
		
		productos.forEach(p -> {
			dbTienda.addProducto(p);
		});
		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(dbTienda));
	}
	
	@PutMapping("/tienda/{id}/eliminar-producto")
	@CrossOrigin
	public ResponseEntity<?> eliminarProducto(@RequestBody Producto producto, @PathVariable Long id){
		Optional<Tienda> t = this.service.findById(id);
		if(!t.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Tienda dbTienda = t.get();
		
		dbTienda.removeProducto(producto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(dbTienda));
	}
/*--------------------------------------------------------------------------------------------------------------------------------*/
	@PostMapping("/tienda/crear-con-foto")
	@CrossOrigin
	public ResponseEntity<?> crearConFoto(@Valid Tienda tienda, BindingResult result,
			@RequestParam MultipartFile archivo) throws IOException{
		
		if(!archivo.isEmpty()) {
			tienda.setFoto(archivo.getBytes());
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(tienda));
	}
	
	@PutMapping("/tienda/editar-con-foto/{id}")
	@CrossOrigin
	public ResponseEntity<?> editarConFoto(@Valid Tienda tienda, @PathVariable Long id,
			@RequestParam MultipartFile archivo) throws IOException{
		
		Optional<Tienda> t = service.findById(id);
		
		if (t.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Tienda tiendadb = t.get();
		tiendadb.setNombre(tienda.getNombre());
		
		if(!archivo.isEmpty()) {
			tiendadb.setFoto(archivo.getBytes());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(service.save(tiendadb));
	}
	
}

