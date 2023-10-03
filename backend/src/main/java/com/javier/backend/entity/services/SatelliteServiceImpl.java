package com.javier.backend.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javier.backend.entity.dao.IPlanetDao;
import com.javier.backend.entity.dao.ISatelliteDao;
import com.javier.backend.entity.model.Planet;
import com.javier.backend.entity.model.Satellite;

@Service
public class SatelliteServiceImpl implements ISatelliteService {

	@Autowired
	private ISatelliteDao satelliteDao;
	
	@Autowired
	private IPlanetDao planetDao;

	@Override
	public List<Satellite> findAll() {
		return (List<Satellite>) satelliteDao.findAll();
	}

	@Override
	public List<Satellite> findAllByPlanet(long id) {
		return satelliteDao.findAllByPlanet(id);
	}

	@Override
	public void delete(long id) {
		satelliteDao.deleteById(id);
	}

	@Override
	public void add(Satellite satellite, long id) {
		Planet planet = planetDao.findById(id).get();
		satellite.setPlanet(planet);
		satelliteDao.save(satellite);
	}

	@Override
	public void update(Satellite satellite, long idSat, long idPlanet) {
		Planet planet = planetDao.findById(idPlanet).get();
		satellite.setId(idSat);
		satellite.setPlanet(planet);
		satelliteDao.save(satellite);
	}


}
