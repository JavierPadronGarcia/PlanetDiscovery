package com.javier.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.javier.backend.entity.model.Satellite;
import com.javier.backend.entity.services.ISatelliteService;

@CrossOrigin(origins = "*")
@RestController
public class SatelliteController {
	
	@Autowired
	private ISatelliteService satelliteService;
	
	@GetMapping("/satellite")
	private List<Satellite> findAll(){
		return satelliteService.findAll();
	}
	
	@GetMapping("/satellite/planet_id/{id}")
	private List<Satellite> findAllByPlanet(@PathVariable("id") long id){
		return satelliteService.findAllByPlanet(id);
	}
	
	@DeleteMapping("/satellite/{id}")
	public void deleteSatellite(@PathVariable(value = "id") long id) {
		satelliteService.delete(id);
	}
}
