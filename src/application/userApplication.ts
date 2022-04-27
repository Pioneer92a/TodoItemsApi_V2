import "reflect-metadata";
import { autoInjectable } from "tsyringe";
import { UserEntity } from "../Domain/Entity/User";
import { UserDomain } from "../Domain/UserDomain";
import {
  validateUser,
  validateUserByEmail,
  validateUserByUUID,
} from "./ApplicationServices";
import { findOrCreateNewUserDTO, UserDTOGenPurpose } from "./DTOs/UserDTO";

@autoInjectable()
export class UserApplicationService {
  userDomain: UserDomain;
  constructor(userDomain: UserDomain) {
    this.userDomain = userDomain;
  }
  /**
   * perform login if user is found, otherwise create a new one in local database
   */
  async findOrCreateUser(payload): Promise<UserEntity> {
    // if user exists then log in, otherwise create a new one
    if (await this.userDomain.findUserbyEmail(payload.email))
      return await this.loginUser(payload);
    else return await this.createNewUser(payload);
  }

  async createNewUser(payload): Promise<UserEntity> {
    const userEntity = findOrCreateNewUserDTO(payload);
    return await this.userDomain.createNewUser(userEntity);
  }

  async loginUser(payload): Promise<UserEntity> {
    const userEntity = findOrCreateNewUserDTO(payload);
    await validateUserByEmail(userEntity.email, this.userDomain);
    return await this.userDomain.loginUser(userEntity.email);
  }

  async logoutUser(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);
    await validateUserByUUID(userDTO.userUUID, this.userDomain);
    return await this.userDomain.logoutUser(userDTO.userUUID);
  }

  /**
   * finds user through their UUID
   */
  async getUserDetails(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);

    await validateUser(userDTO.userUUID, this.userDomain);
    return await this.userDomain.findUserbyUUID(userDTO.userUUID);
  }

  async deleteUser(payload): Promise<UserEntity> {
    const userDTO = UserDTOGenPurpose(payload);
    await validateUser(userDTO.userUUID, this.userDomain);
    return await this.userDomain.deleteUser(userDTO.userUUID);
  }

  // async updateUser(userID) {
  //   return await this.userDomain.updateUser(userID);
  // }
}
