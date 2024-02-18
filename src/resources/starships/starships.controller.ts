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

@ApiTags('Starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.starshipsService.findOne(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
