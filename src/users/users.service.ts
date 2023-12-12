import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    delete savedUser.password;
    return savedUser;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
