package com.javier.backend.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javier.backend.entity.dao.IPlanetDao;
import com.javier.backend.entity.model.Planet;

@Service
public class PlanetServiceImpl implements IPlanetService {

	@Autowired
	private IPlanetDao planetDao;

	@Override
	public List<Planet> getAll() {
		return (List<Planet>) planetDao.findAll();
	}

	@Override
	public void add(Planet planet) {
		planetDao.save(planet);
	}

	@Override
	public void modify(Planet planet, long id) {
		planet.setId(id);
		planetDao.save(planet);
	}

	@Override
	public void delete(long id) {
		planetDao.deleteById(id);
	}

	@Override
	public Planet get(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}