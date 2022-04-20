import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    const games = await this.repository
      .createQueryBuilder("games")
      .select("games.title as title")
      .where("UPPER(games.title) ILIKE :param", { param: `%${param.toUpperCase()}%` })
      .execute();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const games = await this.repository.query(`SELECT COUNT(*) from games`);
    return games;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const game = await this.repository.findOne(id, {
      relations: ["users"],
    })

    if(!game){
      return [];
    }
      
    return game.users;
  }
}
