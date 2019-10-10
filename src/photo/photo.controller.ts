import { Controller, Get, Post, Body, Param, InternalServerErrorException, Put, Patch, Delete } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { InsertResult, UpdateResult } from 'typeorm';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Photo> {
    return this.photoService.findOne(id)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Post()
  create(@Body() body: Photo): Promise<InsertResult> {
    return this.photoService.create(body)
    .then(res => res.raw)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Photo): Promise<UpdateResult> {
    return this.photoService.update(id, body)
    .then(res => res.raw)
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Photo> {
    return this.photoService.findOne(id)
    .then((res) => {
      return this.photoService.delete(res);
    })
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }
}
