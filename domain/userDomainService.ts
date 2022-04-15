import { UserDBServices } from "../infrastructure/services/userDBService";
import { UserStore } from "../infrastructure/stores/userStore";
import { EntityFactory } from "./entityFactory";

const userStore = new UserStore();

interface UserDomainServiceI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(userUUID);
  findUserbyUUID(userUUID);
  deleteUser(userUUID);
  updateUser(userUUID);
}

export class UserDomainService implements UserDomainServiceI {
  //
  async createNewUser(payload) {
    const userEntity = EntityFactory.createUser(payload); // create new user entity through static factory method
    if (!userEntity) throw new Error(`user entity could not be created`);
    //
    return await userStore.add(userEntity); // pass it to store and return store's result
  }

  async loginUser(email) {
    if (await UserDBServices.findUserbyEmail(email))
      // dont use fetch here as it will throw an unwanted error if user doesn't exist
      return await UserDBServices.login(email);
    // if user found then login, otherwise throw error
    else throw new Error(`user having following email not found: ${email}`);
  }

  async logoutUser(userUUID) {
    if (await UserDBServices.findUserbyUUID(userUUID))
      // dont use fetch here as it will throw an unwanted error if user doesn't exist
      return await UserDBServices.logout(userUUID);
    // if user found then logout, otherwise throw error
    else throw new Error(`user having following uuid not found: ${userUUID}`);
  }

  async findUserbyUUID(userUUID) {
    return await userStore.fetchbyUUID(userUUID);
  }

  async findUserbyEmail(email) {
    return await userStore.fetch(email);
  }

  async deleteUser(userUUID) {
    return await userStore.remove(userUUID);
  }

  async updateUser(userUUID) {
    return await userStore.update(userUUID);
  }
}
