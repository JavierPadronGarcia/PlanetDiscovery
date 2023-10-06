create database if not exists planets;
use planets;

create table planet(
id int not null auto_increment primary key,
name varchar(50),
composition varchar(200)
);

create table satellite(
id int not null auto_increment primary key,
name varchar(50),
composition varchar(200),
planet_id int,
constraint sat_fk foreign key (planet_id) references planet(id) on delete cascade on update cascade);

insert into planet (name, composition) values ('Tierra', 'Rocoso');
insert into satellite(name, composition, planet_id) values ('Luna', 'Rocoso', 1);