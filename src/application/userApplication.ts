import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { user } from "../domain/model/user";
import { UserDomainI } from "./domainInterfaces/userDomainI";
import { findOrCreateUserDTO, UserDTOGenPurpose } from "./DTOs/userDTO";

// const userDomain = container.resolve(UserDomain);

interface UserApplicationServiceI {
  // loginUser(payload);
  logoutUser(payload);
  findUser(userID);
  deleteUser(userID);
  // updateUser(userID);
  findOrCreateUser(req);
}

@autoInjectable()
export class UserApplicationService implements UserApplicationServiceI {
  userDomain: UserDomainI;
  constructor(@inject("UserDomainI") userDomain: UserDomainI) {
    this.userDomain = userDomain;
  }
  /**
   * perform login if user is found, otherwise create a new one in local database
   */
  async findOrCreateUser(req): Promise<user> {
    const userEntity = findOrCreateUserDTO(req);

    // if user exists then log in
    if (await this.userDomain.findUserbyEmail(userEntity.email))
      return await this.userDomain.loginUser(userEntity.email);
    // if user doesn't exist then create a new one
    else return await this.userDomain.createNewUser(userEntity);
  }

  async logoutUser(req): Promise<user> {
    const logoutUser = UserDTOGenPurpose(req);
    return await this.userDomain.logoutUser(logoutUser.userUUID);
  }

  /**
   * finds user through their UUID
   */
  async findUser(req): Promise<user> {
    const findUser = UserDTOGenPurpose(req);
    return await this.userDomain.findUserbyUUID(findUser.userUUID);
  }

  async deleteUser(req): Promise<user> {
    const deleteUser = UserDTOGenPurpose(req);
    return await this.userDomain.deleteUser(deleteUser.userUUID);
  }

  // async updateUser(userID) {
  //   return await this.userDomain.updateUser(userID);
  // }
}
