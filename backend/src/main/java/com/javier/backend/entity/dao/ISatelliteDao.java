package com.javier.backend.entity.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.javier.backend.entity.model.Satellite;

public interface ISatelliteDao extends CrudRepository<Satellite, Long> {
	
	@Query("select s from Satellite s where s.planet.id = :id")
	List<Satellite> findAllByPlanet(@Param("id") long id);
}
