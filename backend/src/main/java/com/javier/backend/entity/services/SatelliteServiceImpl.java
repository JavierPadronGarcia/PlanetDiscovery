package com.javier.backend.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javier.backend.entity.dao.ISatelliteDao;
import com.javier.backend.entity.model.Satellite;

@Service
public class SatelliteServiceImpl implements ISatelliteService {

	@Autowired
	private ISatelliteDao satelliteDao;

	@Override
	public List<Satellite> findAll() {
		return (List<Satellite>) satelliteDao.findAll();
	}

	@Override
	public List<Satellite> findAllByPlanet(long id) {
		return satelliteDao.findAllByPlanet(id);
	}

}
