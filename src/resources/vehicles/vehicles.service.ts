import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { In, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { generateURLforGETsByID } from '../../utils/generatorURLs';
import { ReturnVehicleDto } from './dto/return-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const existingVehicle = await this.vehicleRepository.findOne({
      where: { name: createVehicleDto.name },
    });

    if (existingVehicle) {
      throw new ConflictException(
        `Starship with name '${createVehicleDto.name}' already exists`,
      );
    }

    // Assuming you need to fetch related entities before saving
    const films = await this.filmRepository.find({
      where: {
        id: In(createVehicleDto.films),
      },
    });
    const pilots = await this.peopleRepository.find({
      where: {
        id: In(createVehicleDto.pilots),
      },
    });

    // Create a new planet entity and assign values from DTO
    const vehicle = new Vehicle();
    Object.assign(vehicle, createVehicleDto);

    // Assign fetched entities to the species
    vehicle.films = films;
    vehicle.pilots = pilots;

    // Save the species entity
    const savedVehicle = await this.vehicleRepository.save(vehicle);

    //generate  save  url by ID
    vehicle.url = await generateURLforGETsByID('starships', savedVehicle.id);
    await this.vehicleRepository.save(savedVehicle);

    return savedVehicle;
  }

  async findAll() {
    const vehicles: ReturnVehicleDto[] = await this.vehicleRepository.find({
      relations: ['films', 'pilots'],
    });

    vehicles.forEach((vehicle) => {
      vehicle.pilots = vehicle.pilots
        ? vehicle.pilots.map((pilot) => pilot.url)
        : [];
      vehicle.films = vehicle.films
        ? vehicle.films.map((film) => film.url)
        : [];
    });
    return vehicles;
  }

  async findOne(id: number) {
    const vehicle: ReturnVehicleDto = await this.vehicleRepository.findOne({
      relations: ['films', 'pilots'],
      where: { id: id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle  with id - ${id} not found`);
    }

    vehicle.pilots = vehicle.pilots
      ? vehicle.pilots.map((pilot) => pilot.url)
      : [];
    vehicle.films = vehicle.films ? vehicle.films.map((film) => film.url) : [];

    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    if (updateVehicleDto === undefined) {
      throw new Error('UpdateVehicleDto is undefined');
    }
    const vehicle = await this.vehicleRepository.findOneBy({ id: id });

    await Object.assign(vehicle, updateVehicleDto);

    await this.vehicleRepository.save(vehicle);

    return `This action updates a #${id} vehicle`;
  }

  async remove(id: number) {
    const vehicle = await this.vehicleRepository.findOneBy({ id: id });
    await this.vehicleRepository.remove(vehicle);
    return `This action removes a #${id} vehicle`;
  }
}
