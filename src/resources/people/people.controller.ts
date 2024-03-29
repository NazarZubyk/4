import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../authentification/auth/decorators/roles.decorator';
import { Role } from '../../authentification/auth/enums/role.enum';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createPersonDto: CreatePersonDto) {
    console.log('created');
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Roles(Role.User)
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @Roles(Role.User)
  findOne(@Param('id') id: number) {
    return this.peopleService.findOne(id);
  }

  @Get(':page/:size')
  @Roles(Role.User)
  entitiesWithPagination(
    @Param('page') page?: number,
    @Param('size') size?: number,
  ) {
    return this.peopleService.entitiesWithPagination(page, size);
  }

  @Patch(':name')
  @Roles(Role.Admin)
  update(
    @Param('name') name: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(name, updatePersonDto);
  }

  @Delete(':name')
  @Roles(Role.Admin)
  remove(@Query('name') name: string) {
    return this.peopleService.remove(name);
  }
}
