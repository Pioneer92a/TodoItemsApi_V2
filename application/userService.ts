import { UserDomainServices } from "../domain/userDomainServices";

const userDomainServices = new UserDomainServices();

interface UserApplicationServiceI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(payload);
  findUser(userID);
  deleteUser(userID);
  updateUser(userID)
}

export class UserApplicationService implements UserApplicationServiceI {
  async createNewUser(payload) {
    try {
      const newUserCreated = await userDomainServices.createNewUser(payload);
      return newUserCreated;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async loginUser(payload) {
    try {
      const user = await userDomainServices.loginUser(payload);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async logoutUser(payload) {
    try {
      const user = await userDomainServices.logoutUser(payload);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findUser(userID) {
    try {
      const user = await userDomainServices.findUserbyUUID(userID);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteUser(userID) {
    try {
      const deletedUser = await userDomainServices.deleteUser(userID);
      return deletedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUser(userID) {
    try {
      const updatedUser = await userDomainServices.updateUser(userID);
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

}
