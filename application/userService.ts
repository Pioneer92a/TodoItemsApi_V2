import { UserDomainServices } from "../domain/userDomainServices";

const userDomainServices = new UserDomainServices();

interface UserApplicationServiceI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(payload);
  findUser(userID);
  deleteUser(userID);
  updateUser(userID);
  findOrCreateUser(payload)
  findUserByEmail(email)
}

export class UserApplicationService implements UserApplicationServiceI {
  async findOrCreateUser(payload) {
    const user = await this.findUserByEmail(payload.email)
    // console.log('user found', user);
    
    if (user) { // if user is found, then login
      const userFound = await this.loginUser(payload.email)
      return userFound // return the user if its already present in the database
    }

    if (!user) { // create new user if not already in database
      const newUser = await this.createNewUser(payload) 
      return newUser
      // console.log('newUserCreated',newUser);
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
