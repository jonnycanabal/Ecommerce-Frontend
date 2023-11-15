package com.aplicativoEcommerce.app.models.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "tiendas")
public class Tienda {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;
	
	@Column(name = "create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createAt;

	@Lob
	@JsonIgnore
	@Column(columnDefinition = "LONGBLOB")
	private byte[] foto;

	
	//@JsonIgnoreProperties(value = { "tienda" }, allowSetters = true)
	//@OneToMany(mappedBy = "tienda", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@OneToMany(mappedBy = "tienda", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Producto> productos;



	@PrePersist
	public void prePersist() {
		this.createAt = new Date();
	}

	// metodo que retorne un identificador de la foto
	public Integer getFotoHashCode() {
		return (this.foto != null) ? this.foto.hashCode() : null;
	}

	public Tienda() {
		this.productos = new ArrayList<>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		// productos.forEach(this::addProducto);
		this.productos.clear();
		productos.forEach(p -> {
			this.addProducto(p);
		});
		;
	}

	public void addProducto(Producto producto) {
		this.productos.add(producto);
		producto.setTienda(this);
	}

	public void removeProducto(Producto producto) {
		this.productos.remove(producto);
		producto.setTienda(null);
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public byte[] getFoto() {
		return foto;
	}

	public void setFoto(byte[] foto) {
		this.foto = foto;
	}

}
