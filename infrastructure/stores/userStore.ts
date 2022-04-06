import { UserRepository } from "../db/user";
import { UserService } from "../services/userService";
const userRepository = new UserRepository();

interface UserStoreI {
  add(userEntity);
  remove(userUUID);
  update(userUUID);
  fetch(userUUID);
}

export class UserStore implements UserStoreI {
  async add(userEntity) {
    const user = await userRepository.createNewUser(userEntity);
    //
    if (!user) return null;
    else return UserService.createUserEntity(user);
  }

  async remove(userUUID) {
    const user = await userRepository.deleteUser(userUUID);
    //
    if (!user) return null;
    else return UserService.createUserEntity(user);
  }

  async update(userUUID) {
    const user = await userRepository.updateUser(userUUID);
    //
    if (!user) return null;
    else return UserService.createUserEntity(user);
  }

  async fetch(userUUID) {
    const user = await userRepository.findUserbyUUID(userUUID);
    //
    if (!user) return null;
    else return UserService.createUserEntity(user);
  }
}
