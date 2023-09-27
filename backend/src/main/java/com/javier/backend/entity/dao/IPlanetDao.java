package com.javier.backend.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.javier.backend.entity.model.Planet;

public interface IPlanetDao extends CrudRepository<Planet, Long > {

}