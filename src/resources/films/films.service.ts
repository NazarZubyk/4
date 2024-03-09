import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { In, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { generateURLforGETsByID } from '../../utils/generatorURLs';
import { ReturnFilmDto } from './dto/return-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    @Inject('PLANET_REPOSITORY')
    private planetRepository: Repository<Planet>,
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: Repository<Species>,
    @Inject('STARSHIP_REPOSITORY')
    private starshipRepository: Repository<Starship>,
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    // Create a new film entity
    const film = new Film();
    Object.assign(film, createFilmDto);

    // Fetch related entities
    const planets = await this.planetRepository.find({
      where: {
        id: In(createFilmDto.planets),
      },
    });

    const species = await this.speciesRepository.find({
      where: {
        id: In(createFilmDto.species),
      },
    });

    const vehicles = await this.vehicleRepository.find({
      where: {
        id: In(createFilmDto.vehicles),
      },
    });

    const starships = await this.starshipRepository.find({
      where: {
        id: In(createFilmDto.starships),
      },
    });

    const characters = await this.peopleRepository.find({
      where: {
        id: In(createFilmDto.characters),
      },
    });

    // Assign fetched related entities to the film entity
    film.planets = planets;
    film.species = species;
    film.vehicles = vehicles;
    film.starships = starships;
    film.characters = characters;

    // Save the film entity to the database
    const savedFilm = await this.filmRepository.save(film);

    // Generate URL for the film and save it
    savedFilm.url = await generateURLforGETsByID('films', savedFilm.id);
    await this.filmRepository.save(savedFilm);

    return savedFilm;
  }

  async findAll() {
    const films: ReturnFilmDto[] = await this.filmRepository.find({
      relations: ['vehicles', 'species', 'starships', 'planets', 'characters'],
    });

    films.forEach((film) => {
      film.vehicles = film.vehicles
        ? film.vehicles.map((vehicle) => vehicle.url)
        : [];
      film.species = film.species
        ? film.species.map((species) => species.url)
        : [];
      film.starships = film.starships
        ? film.starships.map((starship) => starship.url)
        : [];
      film.planets = film.planets
        ? film.planets.map((planet) => planet.url)
        : [];
      film.characters = film.characters
        ? film.characters.map((character) => character.url)
        : [];
    });

    return films;
  }

  async findOne(id: number) {
    const film: ReturnFilmDto = await this.filmRepository.findOne({
      relations: ['vehicles', 'species', 'starships', 'planets', 'characters'],
      where: { id: id },
    });

    if (!film) {
      throw new NotFoundException(`Film  with id  - ${film.id} not found`);
    }

    film.vehicles = film.vehicles
      ? film.vehicles.map((vehicle) => vehicle.url)
      : [];
    film.species = film.species
      ? film.species.map((species) => species.url)
      : [];
    film.starships = film.starships
      ? film.starships.map((starship) => starship.url)
      : [];
    film.planets = film.planets ? film.planets.map((planet) => planet.url) : [];
    film.characters = film.characters
      ? film.characters.map((character) => character.url)
      : [];

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.findOneBy({ id: id });
    if (!film) {
      throw new Error(`can't find film with id - ${id}`);
    }

    await Object.assign(film, updateFilmDto);
    await this.filmRepository.save(film);

    return `This action updates a #${id} film`;
  }

  async remove(id: number) {
    const film = await this.filmRepository.findOneBy({ id: id });
    await this.filmRepository.remove(film);
    return `This action removes a #${id} film`;
  }
}
