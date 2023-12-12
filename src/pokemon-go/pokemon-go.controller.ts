import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PokemonGoService } from './pokemon-go.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Request } from 'express';

@UseGuards(JwtStrategy)
@Controller('pokemon-go')
export class PokemonGoController {
  constructor(private pokemonGoService: PokemonGoService) {}

  @Post('/catch')
  catch(@Body() body: { pokemonId: number }, @Req() req: Request) {
    //const user = req.user;
    const pokemonId = body?.pokemonId;
    return this.pokemonGoService.catch(pokemonId, 1);
  }
}
