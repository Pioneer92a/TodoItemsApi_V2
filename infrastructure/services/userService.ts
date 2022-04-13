import { UserRepository } from "../db/repository/userRepository";
const userRepository = new UserRepository();

export class UserServices {
  /**
   * takes in the task body and returns task entity
   */
  static createUserEntity(user) {
    const newUserEntity = {
      name: user.name,
      email: user.email,
      uuid: user.uuid,
    };
    return newUserEntity;
  }

  static async findUserbyUUID(userUUID) {
    return await userRepository.findUserbyUUID(userUUID);
  }
}
