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

insert into planet (name, composition) values ('Tierra', 'Rocoso');
insert into satellite(name, composition, planet_id) values ('Luna', 'Rocoso', 1);