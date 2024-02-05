import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    console.log("created")
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  findAll() {
    console.log('findAll')
    return this.peopleService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.peopleService.findOne(name);
  }

  @Get(':page/:size')
  entitiesWithPagination(
    @Param('page') page?:number  ,
    @Param('size') size?:number 
  ){
    return this.peopleService.entitiesWithPagination(page,size);
  }

  

  @Patch(':name')
  update(@Param('name') name: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(name, updatePersonDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.peopleService.remove(name);
  }
}