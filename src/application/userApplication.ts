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
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Infrastructure/Config";

@autoInjectable()
export class UserApplication {
  userDomain: UserDomain;
  constructor(userDomain: UserDomain) {
    this.userDomain = userDomain;
  }
  /**
   * perform login if user is found, otherwise create a new one in local database
    create a jwt token for the user as well 
  */
  async findOrCreateUser(payload): Promise<UserEntity> {
    // if user exists then log in, otherwise create a new one
    let user: UserEntity;
    if (await this.userDomain.findUserbyEmail(payload.email))
      user = await this.loginUser(payload);
    else user = await this.createNewUser(payload);
    const token = jwt.sign({ _uuid: user.uuid.toString() }, JWT_SECRET);
    user.token = token;
    return user;
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
