import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, {
      relations: ["games"],
    })
    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const user = await this.repository.query(
      `SELECT * FROM users ORDER BY first_name ASC`
    );
    return user;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const user = await this.repository.query(
      `SELECT * FROM users WHERE UPPER(first_name) = '${first_name.toUpperCase()}' AND UPPER(last_name) = '${last_name.toUpperCase()}'`
    );
    return user;
  }
}
