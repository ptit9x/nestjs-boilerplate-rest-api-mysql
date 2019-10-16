import { Controller, Get, Param, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  findAll(): Promise<{ data: Users[], total: number }> {
    return this.userService.findAll()
    .then((res) => {
      if (!res) {
        throw new Error('error');
      }
      const [data, total] = res;
      return {
        data,
        total,
      };
    })
    .catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Users> {
    return this.userService.findOne(id)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

}
