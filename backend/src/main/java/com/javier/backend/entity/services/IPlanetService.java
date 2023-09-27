package com.javier.backend.entity.services;

import java.util.List;

import com.javier.backend.entity.model.Planet;

public interface IPlanetService {
	public List<Planet> getAll();

	public Planet get(long id);

	public void add(Planet planet);

	public void modify(Planet planet, long id);

	public void delete(long id);
}