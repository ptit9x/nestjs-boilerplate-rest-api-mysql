import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  findOneByConditions({ username }: any): Promise<Users> {
    return this.userRepository.findOne({ username });
  }

  findOne(id: number): Promise<Users> {
    return this.userRepository.findOneOrFail(id);
  }

  findAll(): Promise<[Users[], number]> {
    return this.userRepository.findAndCount();
  }
}
