import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../authentification/auth/decorators/roles.decorator';
import { Role } from '../../authentification/auth/enums/role.enum';

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @Roles(Role.User)
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @Roles(Role.User)
  findOne(@Param('id') id: number) {
    return this.starshipsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
