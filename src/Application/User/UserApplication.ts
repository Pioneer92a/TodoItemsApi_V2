import * as jwt from "jsonwebtoken";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../../Domain/EntityFactory";
import { UserEntity } from "../../Domain/User/Entity";
import { UserRepositoryI } from "../../Domain/User/Repository";
import { JWT_SECRET } from "../../Infrastructure/Cross-Cutting/Config";
import { throwErrorUfUserNotFoundByEmail } from "../ApplicationServices";
import { FindOrAddUserDTO, GeneralUserDTO } from "./UserDTO";

@autoInjectable()
export class UserApplication {
  userRepository: UserRepositoryI;
  constructor(@inject("UserRepositoryI") userRepository: UserRepositoryI) {
    this.userRepository = userRepository;
  }

  /**
   * perform login if user is found, otherwise create a new one in local database
    create a jwt token for the user as well 
  */
  async findOrAddUser(payload: FindOrAddUserDTO): Promise<UserEntity> {
    let user: UserEntity;
    if (await this.userRepository.fetchUserbyEmail(payload.email))
      user = await this.loginUser(payload);
    else user = await this.addUser(payload);
    const token = jwt.sign({ _uuid: user.uuid.toString() }, JWT_SECRET);
    user.token = token;
    return user;
  }

  async addUser(payload: FindOrAddUserDTO): Promise<UserEntity> {
    const userEntity = EntityFactory.createUser(
      uuidv1(),
      payload.name,
      payload.email
    );
    return await this.userRepository.addNewUser(userEntity);
  }

  async loginUser(payload: FindOrAddUserDTO): Promise<UserEntity> {
    await throwErrorUfUserNotFoundByEmail(payload.email, this.userRepository);
    return await this.userRepository.login(payload.email);
  }

  async logoutUser(payload: GeneralUserDTO): Promise<UserEntity> {
    return await this.userRepository.logout(payload.uuid);
  }

  async fetchUserbyUUID(payload: GeneralUserDTO): Promise<UserEntity> {
    return await this.userRepository.fetchUserbyUUID(payload.uuid);
  }

  async deleteUser(payload: GeneralUserDTO): Promise<UserEntity> {
    return await this.userRepository.deleteUser(payload.uuid);
  }
}
