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
import com.javier.backend.entity.services.IPlanetService;

@CrossOrigin(origins = "*")
@RestController
public class PlanetController {
	@Autowired
	private IPlanetService planetService;

	@GetMapping("/planet")
	public List<Planet> getAll() {
		return planetService.getAll();
	}

	public Planet get(long id) {
		return planetService.get(id);
	}

	@PostMapping("/planet")
	public void addPlanet(Planet planet) {
		planetService.add(planet);
	}

	@PutMapping("/planet/{id}")
	public void modifyPlanet(Planet planet, @PathVariable(value = "id") long id) {
		planetService.modify(planet, id);
	}

	@DeleteMapping("/planet/{id}")
	public void deletePlanet(@PathVariable(value = "id") long id) {
		planetService.delete(id);
	}
}
