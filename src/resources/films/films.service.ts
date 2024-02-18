import { Inject, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {

  constructor(
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
  ){}

  async create(createFilmDto: CreateFilmDto) {
    await this.filmRepository.save(createFilmDto)
    return 'This action adds a new film';
  }

  async findAll() {
    return await this.filmRepository.find();
  }

  async findOne(id: number) {
    return await this.filmRepository.findOneBy({id:id});
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.findOneBy({id:id})
    if(!film){
      throw new Error(`can't find film with id - ${id}`)
    }

    await Object.assign(film,updateFilmDto);
    await this.filmRepository.save(film)

    return `This action updates a #${id} film`;
  }

  async remove(id: number) {
    const film = await this.filmRepository.findOneBy({id:id}) 
    await this.filmRepository.remove(film);
    return `This action removes a #${id} film`;
  }
}
