import { EntityFactory } from "../model/entityFactory";
import { UserRepositoryI } from "../../infrastructure/repository/UserRepositoryI";
import { autoInjectable, inject } from "tsyringe";

@autoInjectable()
export class UserDomainService {
  //
  userRepository: UserRepositoryI;
  constructor(@inject("UserRepositoryI") userRepository: UserRepositoryI) {
    this.userRepository = userRepository;
  }

  async createNewUser(payload) {
    // create entity
    const userEntity = EntityFactory.createUser(payload); // create new user entity through static factory method
    if (!userEntity) throw new Error(`user entity could not be created`);

    // create new user by accessing repository
    const user = await this.userRepository.createNewUser(userEntity);
    if (user) return user; // create entity later
    else throw new Error(`user could not be added`);
    // return await userStore.add(userEntity); // pass it to store and return store's result
  }

  async loginUser(email) {
    if (await this.userRepository.findUserbyEmail(email))
      // dont use fetch here as it will throw an unwanted error if user doesn't exist
      return await this.userRepository.login(email);
    // if user found then login, otherwise throw error
    else throw new Error(`user having following email not found: ${email}`);
  }

  async logoutUser(userUUID) {
    if (await this.userRepository.findUserbyUUID(userUUID))
      // dont use fetch here as it will throw an unwanted error if user doesn't exist
      return await this.userRepository.logout(userUUID);
    // if user found then logout, otherwise throw error
    else throw new Error(`user having following uuid not found: ${userUUID}`);
  }

  async findUserbyUUID(userUUID) {
    return await this.userRepository.findUserbyUUID(userUUID);
  }

  async findUserbyEmail(email) {
    return await this.userRepository.findUserbyEmail(email);
  }

  async deleteUser(userUUID) {
    return await this.userRepository.deleteUser(userUUID);
  }

  async updateUser(userUUID) {
    return await this.userRepository.updateUser(userUUID);
  }
}
