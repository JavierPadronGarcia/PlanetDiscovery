package com.javier.backend.entity.model;

import java.io.Serializable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "planet")
public class Planet implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	String name;
	String discoveryDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDiscoveryDate() {
		return discoveryDate;
	}

	public void setDiscoveryDate(String discoveryDate) {
		this.discoveryDate = discoveryDate;
	}

	public Planet(String name, String discoveryDate) {
		super();
		this.name = name;
		this.discoveryDate = discoveryDate;
	}

	public Planet() {

	}

}