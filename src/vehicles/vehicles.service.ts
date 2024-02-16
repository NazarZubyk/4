import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {

constructor(
  @Inject('VEHICLE_REPOSITORY')
  private vehicleRepository: Repository<Vehicle>,
){}

  async create(createVehicleDto: CreateVehicleDto) {
    await this.vehicleRepository.save(createVehicleDto);
    return 'This action adds a new vehicle';
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOne(name: string) {
    return await this.vehicleRepository.findOneBy({name:name});
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
      if(updateVehicleDto===undefined){
        throw new Error('UpdateVehicleDto is undefined');
      }
    const vehicle = await this.vehicleRepository.findOneBy({id:id})

    await Object.assign(vehicle,updateVehicleDto);

    await this.vehicleRepository.save(vehicle)

    return `This action updates a #${id} vehicle`;
  }

  async remove(id: number) {
    const vehicle = await this.vehicleRepository.findOneBy({id:id}) 
    await this.vehicleRepository.remove(vehicle)
    return `This action removes a #${id} vehicle`;
  }
}
