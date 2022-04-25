import { autoInjectable, inject } from "tsyringe";
import { UserDomainI } from "../../application/domainInterfaces/userDomainI";
import { UserRepositoryI } from "../repoInterface/UserRepositoryI";
import { user } from "../model/user";

@autoInjectable()
export class UserDomain implements UserDomainI {
  //
  userRepository: UserRepositoryI;
  constructor(@inject("UserRepositoryI") userRepository: UserRepositoryI) {
    this.userRepository = userRepository;
  }

  async createNewUser(userEntity): Promise<user> {
    // create new user by accessing repository
    const userObj = await this.userRepository.createNewUser(userEntity);
    return this.createReturnEntity(userObj);
  }

  async loginUser(email): Promise<user> {
    await this.checkIfUserExistsByEmail(email); //throw an error if email not found
    const userObj = await this.userRepository.login(email);
    return this.createReturnEntity(userObj);
  }

  async logoutUser(uuid): Promise<user> {
    await this.checkIfUserExistsByUUID(uuid);
    const userObj = await this.userRepository.logout(uuid);
    return this.createReturnEntity(userObj);
  }

  async findUserbyUUID(userUUID): Promise<user> {
    const userObj = await this.userRepository.findUserbyUUID(userUUID);
    return this.createReturnEntity(userObj);
  }

  async findUserbyEmail(email: string): Promise<user> {
    const userObj = await this.userRepository.findUserbyEmail(email);
    return this.createReturnEntity(userObj);
  }

  async deleteUser(userUUID): Promise<user> {
    const userObj = await this.userRepository.deleteUser(userUUID);
    return this.createReturnEntity(userObj);
  }

  async updateUser(userUUID): Promise<user> {
    const userObj = await this.userRepository.updateUser(userUUID);
    return this.createReturnEntity(userObj);
  }

  /**
   * throw an error if user with this email doesn't exist
   */
  private async checkIfUserExistsByEmail(email) {
    if (!(await this.userRepository.findUserbyEmail(email)))
      throw new Error(`user having following email not found: ${email}`);
  }

  /**
   * throw an error if user with this email doesn't exist
   */
  private async checkIfUserExistsByUUID(uuid) {
    if (!(await this.userRepository.findUserbyUUID(uuid)))
      throw new Error(`user having following uuid not found: ${uuid}`);
  }

  /**
   * creates a user entity for return purposes
   */
  private createReturnEntity(userObj): user {
    if (!userObj) return null; // return null if input arg is null
    else
      return new user({
        name: userObj.name,
        email: userObj.email,
        uuid: userObj.uuid,
      });
  }
}
