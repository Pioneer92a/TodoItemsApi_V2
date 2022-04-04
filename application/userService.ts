import { userEntity } from "../domain/userEntity";

export class userService {
  static async createNewUser(payload): Promise<typeof x> {
    let x;
    try {
      x = await userEntity.createNewUser(payload);
    } catch (e) {
      console.log(e);
    }
    return x;
  }

  static async loginUser(payload): Promise<typeof x> {
    const x = await userEntity.loginUser(payload);
    return x;
  }

  static async logoutUser(payload): Promise<typeof x> {
    const x = await userEntity.logoutUser(payload);    
    return x;
  }

  static async findUser(userID): Promise<typeof x> {
    let x;
    try {
      x = await userEntity.findUserbyUUID(userID);
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUser(userID): Promise<typeof x> {
    const x = await userEntity.deleteUser(userID);
    return x;
  }
}
