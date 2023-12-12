import { Module } from '@nestjs/common';
import { PokemonGoController } from './pokemon-go.controller';
import { PokemonGoService } from './pokemon-go.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserPokemon } from 'src/entities/user-pokemon.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, UserPokemon])],
  controllers: [PokemonGoController],
  providers: [PokemonGoService],
  exports: [PokemonGoService],
})
export class PokemonGoModule {}
