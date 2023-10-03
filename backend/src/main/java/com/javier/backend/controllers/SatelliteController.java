package com.javier.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javier.backend.entity.model.Planet;
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
	
	@PostMapping("/satellite/planet_id/{id}")
	public void addSatellite(Satellite satellite, @PathVariable("id") long id) {
		satelliteService.add(satellite, id);
	}
	
	@PutMapping("/satellite/planet_id/{id}")
	public void updateSatellite(Satellite satellite, long idSat, @PathVariable("id") long idPlanet) {
		satelliteService.update(satellite, idSat, idPlanet);
	}
	
	@DeleteMapping("/satellite/{id}")
	public void deleteSatellite(@PathVariable(value = "id") long id) {
		satelliteService.delete(id);
	}
}
