CREATE DATABASE `planets`;
USE `planets`;

CREATE TABLE `planet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `composition` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `satellite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `composition` varchar(200) DEFAULT NULL,
  `planet_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sat_fk_idx` (`planet_id`),
  CONSTRAINT `sat_fk` FOREIGN KEY (`planet_id`) REFERENCES `planet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

insert into planet (name, composition) values ('Mercurio', 'Estéril');
insert into planet (name, composition) values ('Venus', 'Rocoso');
insert into planet (name, composition) values ('Tierra', 'Rocoso');
insert into planet (name, composition) values ('Marte', 'Rocoso');
insert into planet (name, composition) values ('Júpiter', 'Gaseoso');
insert into planet (name, composition) values ('Saturno', 'Gaseoso');
insert into planet (name, composition) values ('Urano', 'Gaseoso');
insert into planet (name, composition) values ('Neptuno', 'Gaseoso');

insert into satellite(name, composition, planet_id) values ('Luna', 'Estéril', 3);

insert into satellite(name, composition, planet_id) values ('Fobos', 'Asteroide', 4);
insert into satellite(name, composition, planet_id) values ('Deimos', 'Asteroide', 4);

insert into satellite(name, composition, planet_id) values ('Ío', 'Estéril', 5);
insert into satellite(name, composition, planet_id) values ('Europa', 'Hielo', 5);
insert into satellite(name, composition, planet_id) values ('Ganímedes', 'Hielo', 5);
insert into satellite(name, composition, planet_id) values ('Calisto', 'Hielo', 5);

insert into satellite(name, composition, planet_id) values ('Mimas', 'Hielo', 6);
insert into satellite(name, composition, planet_id) values ('Encélado', 'Hielo', 6);
insert into satellite(name, composition, planet_id) values ('Tetis', 'Hielo', 6);
insert into satellite(name, composition, planet_id) values ('Dione', 'Hielo', 6);
insert into satellite(name, composition, planet_id) values ('Rea', 'Hielo', 6);
insert into satellite(name, composition, planet_id) values ('Titán', 'Rocoso', 6);
insert into satellite(name, composition, planet_id) values ('Jápeto', 'Hielo', 6);

insert into satellite(name, composition, planet_id) values ('Miranda', 'Hielo', 7);
insert into satellite(name, composition, planet_id) values ('Ariel', 'Hielo', 7);
insert into satellite(name, composition, planet_id) values ('Umbriel', 'Hielo', 7);
insert into satellite(name, composition, planet_id) values ('Titania', 'Hielo', 7);
insert into satellite(name, composition, planet_id) values ('Oberón', 'Hielo', 7);

insert into satellite(name, composition, planet_id) values ('Tritón', 'Hielo', 8);