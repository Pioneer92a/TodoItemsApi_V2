import { db } from "../infrastructure/db/user";
import { userDTO } from "./userDTO";
import * as jwt from "jsonwebtoken"; // For user authentication;
import { JWT_SECRET } from "../infrastructure/config";

export class userEntity {
  static async createNewUser(payload): Promise<typeof x> {
    let x;
    try {

      const user = new userDTO(payload); // create new DTO (Data Transfer Object) from payload coming in from service layer
      x = await db.createNewUser(user); // userDTO here acts as middleware between service layer & database
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async loginUser(payload): Promise<typeof x> {
    let x;
    try {
      // find our required user
      const userFound = await db.findUserbyEmail(payload.email);

      // check if user exists. Then check password
      if (userFound !== null && userFound.password === payload.password) {
        const token = jwt.sign({ uuid: userFound.uuid.toString() }, JWT_SECRET);
        x = await db.addTokenToUser(payload, token); // add token to the user
      } else {
        x = null;
      }

      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async logoutUser(userID): Promise<typeof x> {
    
    let x;
    try {
      const _user = await db.findUserbyUUID(userID);
      if (!_user || !_user.token) return null; 
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      x = await db.removeTokenFromUser(userID); // remove token from user that was created during login
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  // find user by their UUID
  static async findUserbyUUID(userUUID): Promise<typeof _user> {
    let _user;
    try {
      _user = await db.findUserbyUUID(userUUID);
      if (!_user || !_user.token) return null; 
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain
      
      return _user;

    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUser(userID): Promise<typeof x> {
    const _user = await db.findUserbyUUID(userID);
    if (!_user || !_user.token) return null; 
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain
    
    const x = await db.deleteUser(userID);
    return x;
  }
}
