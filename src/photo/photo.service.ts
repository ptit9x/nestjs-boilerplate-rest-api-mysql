import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  findOne(id: number): Promise<Photo> {
    return this.photoRepository.findOneOrFail(id);
  }

  create(photo: Photo): Promise<InsertResult> {
    return this.photoRepository.insert(photo);
  }

  update(id: number, photo: Photo): Promise<UpdateResult> {
    return this.photoRepository.update(id, photo);
  }

  delete(photo: Photo): Promise<Photo> {
    return this.photoRepository.remove(photo);
  }
}
