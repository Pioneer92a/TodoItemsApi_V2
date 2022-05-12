import * as jwt from "jsonwebtoken";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { UserEntity } from "../Domain/User/UserEntity";
import { UserRepositoryI } from "../Domain/User/UserRepository";
import { JWT_SECRET } from "../Infrastructure/Config";
import {
  validateUser,
  validateUserByEmail,
  validateUserByUUID,
} from "./ApplicationServices";
import { findOrCreateNewUserDTO, UserDTOGenPurpose } from "./DTOs/UserDTO";

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
  async findOrAddUser(payload): Promise<UserEntity> {
    // if user exists then log in, otherwise create a new one
    let user: UserEntity;
    if (await this.userRepository.fetchUserbyEmail(payload.email))
      user = await this.loginUser(payload);
    else user = await this.addUser(payload);
    const token = jwt.sign({ _uuid: user.uuid.toString() }, JWT_SECRET);
    user.token = token;
    return user;
  }

  async addUser(payload): Promise<UserEntity> {
    const userEntity = findOrCreateNewUserDTO(payload);
    return await this.userRepository.addNewUser(userEntity);
  }

  async loginUser(payload): Promise<UserEntity> {
    const userEntity = findOrCreateNewUserDTO(payload);
    await validateUserByEmail(userEntity.email, this.userRepository);
    return await this.userRepository.login(userEntity.email);
  }

  async logoutUser(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);
    await validateUserByUUID(userDTO.userUUID, this.userRepository);
    return await this.userRepository.logout(userDTO.userUUID);
  }

  /**
   * finds user through their UUID
   */
  async fetchUser(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);

    await validateUser(userDTO.userUUID, this.userRepository);
    return await this.userRepository.fetchUserbyUUID(userDTO.userUUID);
  }

  async deleteUser(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);
    await validateUser(userDTO.userUUID, this.userRepository);
    return await this.userRepository.deleteUser(userDTO.userUUID);
  }

  // async updateUser(userID) {
  //   return await this.userDomain.updateUser(userID);
  // }
}
