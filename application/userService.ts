import { UserDomainServices } from "../domain/userDomainServices";

const userDomainServices = new UserDomainServices();

interface UserApplicationServiceI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(payload);
  findUser(userID);
  deleteUser(userID);
  updateUser(userID);
  findOrCreateUser(payload);
  findUserByEmail(email);
}

export class UserApplicationService implements UserApplicationServiceI {
  /**
   * perform login if user is found, otherwise create a new one in local database
   */
  async findOrCreateUser(payload) {
    const user = await this.findUserByEmail(payload.email);

    // if user is found, then login
    if (user) {
      const userFound = await this.loginUser(payload.email);
      return userFound; // return the user if its already present in the database
    }

    // create new user if not already in database
    if (!user) {
      const newUser = await this.createNewUser(payload);
      return newUser;
    }
  }

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
      const user = await userDomainServices.logoutUser(payload.userUUID);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findUser(payload) {
    try {
      const user = await userDomainServices.findUserbyUUID(payload.userUUID);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await userDomainServices.findUserbyEmail(email);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteUser(payload) {
    try {
      const deletedUser = await userDomainServices.deleteUser(payload.userUUID);
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
