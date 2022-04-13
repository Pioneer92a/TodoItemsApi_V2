import { UserRepository } from "../db/repository/userRepository";
import { UserServices } from "../services/userService";
const userRepository = new UserRepository();

interface UserStoreI {
  add(userEntity);
  remove(userUUID);
  update(userUUID);
  fetch(userUUID);
}

/**
 * store is an abstraction on top of database
 */
export class UserStore implements UserStoreI {
  async add(userEntity) {
    const user = await userRepository.createNewUser(userEntity);
    //
    if (!user) return null;
    else return UserServices.createUserEntity(user);
  }

  async remove(userUUID) {
    const user = await userRepository.deleteUser(userUUID);
    //
    if (!user) return null;
    else return UserServices.createUserEntity(user);
  }

  async update(userUUID) {
    const user = await userRepository.updateUser(userUUID);

    if (!user) return null;
    else return UserServices.createUserEntity(user);
  }

  async fetchbyUUID(userUUID) {
    const user = await userRepository.findUserbyUUID(userUUID);
    //
    if (!user) return null;
    else return UserServices.createUserEntity(user);
  }

  async fetch(email) {
    const user = await userRepository.findUserbyEmail(email);
    //
    if (!user) return null;
    else return UserServices.createUserEntity(user);
  }
}
