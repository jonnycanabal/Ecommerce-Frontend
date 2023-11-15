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
import com.aplicativoEcommerce.app.services.ProductoService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin // anotacion para dar acceso o enlazar spring con angular para mandar los datos.
public class ProductoController {

	@GetMapping("/producto/uploads/img/{id}")
	@CrossOrigin
	public ResponseEntity<?> verFoto(@PathVariable Long id){
		
		Optional<Producto> o = service.findById(id);
		if (o.isEmpty() || o.get().getFoto() == null) {
			return ResponseEntity.notFound().build();
		}
		
		Resource imagen = new ByteArrayResource(o.get().getFoto());
		
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagen);
	}
	
	
	@Autowired
	private ProductoService service;

	@GetMapping("/producto") // dar una ruta URL
	@CrossOrigin
	public ResponseEntity<List<Producto>> getProductos() {
	    List<Producto> productos = service.getProductosConTienda(); // Esto carga productos con información de la tienda
	    return new ResponseEntity<>(productos, HttpStatus.OK);
	}
	//public ResponseEntity<?> listar() {
	//	return ResponseEntity.ok().body(service.findAll());
	//}
	
	

	@GetMapping("/producto/ver/{id}")
	@CrossOrigin
	public ResponseEntity<?> ver(@PathVariable Long id) {

		Optional<Producto> o = service.findById(id);
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(o.get());
	}

	@PostMapping("/producto/crear")
	@CrossOrigin
	public ResponseEntity<?> crear(@RequestBody Producto producto) {
		Producto productodb = service.save(producto);
		return ResponseEntity.status(HttpStatus.CREATED).body(productodb);

	}

	@PutMapping("/producto/editar/{id}")
	@CrossOrigin
	public ResponseEntity<?> editar(@RequestBody Producto producto, @PathVariable Long id) {

		Optional<Producto> o = service.findById(id);

		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Producto productodb = o.get();
		productodb.setNombre(producto.getNombre());
		productodb.setMarca(producto.getMarca());
		productodb.setPrecio(producto.getPrecio());

		return ResponseEntity.status(HttpStatus.OK).body(service.save(productodb));
	}

	@DeleteMapping("/producto/eliminar/{id}")
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
	
/*--------------------------------------------------------------------------------------------------------------------------------*/
	@PostMapping("/producto/crear-con-foto")
	@CrossOrigin
	public ResponseEntity<?> crearConFoto(@Valid Producto producto, BindingResult result, 
			@RequestParam MultipartFile archivo) throws IOException{
		if(!archivo.isEmpty()) {
			producto.setFoto(archivo.getBytes());
		}
		

		//return this.crear(producto, result);
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(producto));
		
	}
	
	//private ResponseEntity<?> crear(@Valid Producto producto, BindingResult result) {
		
		//return ResponseEntity.status(HttpStatus.CREATED).body(service.save(producto));
	//}

	@PutMapping("/producto/editar-con-foto/{id}")
	@CrossOrigin
	public ResponseEntity<?> editarConFoto(@Valid Producto producto, @PathVariable Long id, 
			@RequestParam MultipartFile archivo) throws IOException{

		Optional<Producto> o = service.findById(id);

		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Producto productodb = o.get();
		productodb.setNombre(producto.getNombre());
		productodb.setMarca(producto.getMarca());
		productodb.setPrecio(producto.getPrecio());

		
		if(!archivo.isEmpty()) {
			productodb.setFoto(archivo.getBytes());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(service.save(productodb));
	}
	
	@GetMapping("/producto/por-tienda/{tiendaId}")
	public ResponseEntity<List<Producto>> getProductosPorTienda(@PathVariable Long tiendaId) {
	    List<Producto> productos = service.getProductosPorTienda(tiendaId);
	    return new ResponseEntity<>(productos, HttpStatus.OK);
	}
}

