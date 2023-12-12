import { Injectable } from '@nestjs/common';
import { UserPokemon } from 'src/entities/user-pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PokemonGoService {
  constructor(
    @InjectRepository(UserPokemon)
    private userPokemonRepository: Repository<UserPokemon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async catch(pokemonId: number, userId: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });

    const userPokemon = new UserPokemon();
    userPokemon.user = user;
    userPokemon.pokemonId = pokemonId;
    const savedUserPokemon = await this.userPokemonRepository.save(userPokemon);

    return !!savedUserPokemon;
  }
}
