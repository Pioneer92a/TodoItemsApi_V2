import { autoInjectable, inject } from "tsyringe";
import { UserRepositoryI } from "./RepoInterface/UserRepositoryI";
import { UserEntity } from "./Entity/User";

@autoInjectable()
export class UserDomain {
  //
  userRepository: UserRepositoryI;
  constructor(@inject("UserRepositoryI") userRepository: UserRepositoryI) {
    this.userRepository = userRepository;
  }

  async createNewUser(userEntity: UserEntity): Promise<UserEntity> {
    const userObj = await this.userRepository.createNewUser(userEntity);
    return this.createReturnEntity(userObj);
  }

  async loginUser(email: string): Promise<UserEntity> {
    const userObj = await this.userRepository.login(email);
    return this.createReturnEntity(userObj);
  }

  async logoutUser(userUUID: string): Promise<UserEntity> {
    const userObj = await this.userRepository.logout(userUUID);
    return this.createReturnEntity(userObj);
  }

  async isUserLoggedIn(userUUID: string): Promise<boolean> {
    const userObj = await this.userRepository.findUserbyUUID(userUUID);
    if (userObj.isLoggedIn) return true;
    else return false;
  }

  async deleteUser(userUUID: string): Promise<UserEntity> {
    const userObj = await this.userRepository.deleteUser(userUUID);
    return this.createReturnEntity(userObj);
  }

  async updateUser(userUUID: string): Promise<UserEntity> {
    const userObj = await this.userRepository.updateUser(userUUID);
    return this.createReturnEntity(userObj);
  }

  async findUserbyUUID(userUUID: string): Promise<UserEntity> {
    const userObj = await this.userRepository.findUserbyUUID(userUUID);
    return this.createReturnEntity(userObj);
  }

  async findUserbyEmail(email: string): Promise<UserEntity> {
    const userObj = await this.userRepository.findUserbyEmail(email);
    return this.createReturnEntity(userObj);
  }


  /**
   * creates a user entity for return purposes
   */
  private createReturnEntity(userObj): UserEntity {
    if (!userObj) return null; // return null if input arg is null
    else
      return new UserEntity({
        name: userObj.name,
        email: userObj.email,
        uuid: userObj.uuid,
      });
  }
}
