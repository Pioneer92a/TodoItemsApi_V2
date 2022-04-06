import { UserRepository } from "../infrastructure/db/user";
import { UserStore } from "../infrastructure/stores/userStore";
import * as jwt from "jsonwebtoken"; // For user authentication;
import { JWT_SECRET } from "../infrastructure/config";
import { Entity } from "./entity";

const userRepository = new UserRepository();
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
      const userEntity = Entity.createUser(payload); // create new user entity trough static factory method
      const newUserCreated = await userStore.add(userEntity);
      return newUserCreated;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async loginUser(payload) {
    try {
      // find our required user
      const userFound = await userRepository.findUserbyEmail(payload.email);

      // check if user exists. Then check password
      if (userFound !== null && userFound.password === payload.password) {
        const token = jwt.sign({ uuid: userFound.uuid.toString() }, JWT_SECRET);
        const user = await userRepository.addTokenToUser(payload, token); // add token to the user
        return user;
      } else {
        return null;
      }
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async logoutUser(userUUID) {
    try {
      const _user = await userRepository.findUserbyUUID(userUUID);
      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      const user = await userRepository.removeTokenFromUser(userUUID); // remove token from user that was created during login
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
      const _user = await userStore.fetch(userUUID);
      if (!_user || !_user.token) return null;
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

      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
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

      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      return _user;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
