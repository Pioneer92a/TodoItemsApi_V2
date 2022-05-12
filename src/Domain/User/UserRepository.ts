import { User } from "@prisma/client";
import { UserEntity } from "./UserEntity";

export interface UserRepositoryI {
  addNewUser(newUser: UserEntity): Promise<User>;
  fetchUserbyUUID(userUUID: string): Promise<User>;
  fetchUserbyEmail(userEmail: string): Promise<User>;
  fetchUserbyId(userId: number): Promise<User>;
  deleteUser(userUUID: string): Promise<User>;
  logout(userUUID: string): Promise<User>;
  login(userEmail: string): Promise<User>;
  updateUser(userUUID: string): Promise<User>;
}
