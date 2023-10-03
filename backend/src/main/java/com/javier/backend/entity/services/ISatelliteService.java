package com.javier.backend.entity.services;

import java.util.List;

import com.javier.backend.entity.model.Satellite;

public interface ISatelliteService {
	List<Satellite> findAll();

	List<Satellite> findAllByPlanet(long id);

	void add(Satellite satellite, long id);

	void delete(long id);

}
