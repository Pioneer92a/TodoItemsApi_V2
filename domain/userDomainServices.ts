import { UserServices as UserRepositoryServices } from "../infrastructure/services/userService";
import { UserStore } from "../infrastructure/stores/userStore";
import { EntityFactory } from "./entityFactory";

const userStore = new UserStore();

interface UserDomainServicesI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(userUUID);
  findUserbyUUID(userUUID);
  deleteUser(userUUID);
  updateUser(userUUID);
}

export class UserDomainServices implements UserDomainServicesI {
  async createNewUser(payload) {
    try {
      const userEntity = EntityFactory.createUser(payload); // create new user entity trough static factory method
      const newUserCreated = await userStore.add(userEntity);
      return newUserCreated;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async loginUser(email) {
    try {
      // find our required user
      const user = await UserRepositoryServices.findUserbyEmail(email);
      if (!user) return null;

      const userFound = await UserRepositoryServices.login(email);
      return userFound;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async logoutUser(userUUID) {
    try {
      const _user = await UserRepositoryServices.findUserbyUUID(userUUID);
      if (!_user) return null;

      const user = await UserRepositoryServices.logout(userUUID);
      return user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // find user by their UUID
  async findUserbyUUID(userUUID) {
    try {
      const _user = await userStore.fetchbyUUID(userUUID);
      if (!_user) return null;
      // this logic may later be moved to a higher layer of domain

      return _user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // find user by their UUID
  async findUserbyEmail(email) {
    try {
      const _user = await userStore.fetch(email);
      // if (!_user || !_user.token) return null;
      if (!_user) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      return _user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteUser(userUUID) {
    try {
      const _user = await userStore.remove(userUUID);

      if (!_user) return null;
      // this logic may later be moved to a higher layer of domain

      return _user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUser(userUUID) {
    try {
      const _user = await userStore.update(userUUID);

      if (!_user) return null;

      return _user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
