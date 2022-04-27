import { User } from "@prisma/client";
import { UserEntity } from "../Entity/User";

export interface UserRepositoryI {
  createNewUser(newUser: UserEntity): Promise<User>;
  findUserbyUUID(userUUID: string): Promise<User>;
  findUserbyEmail(userEmail: string): Promise<User>;
  findUserbyId(userId: number): Promise<User>;
  deleteUser(userUUID: string): Promise<User>;
  logout(userUUID: string): Promise<User>;
  login(userEmail: string): Promise<User>;
  updateUser(userUUID: string): Promise<User>;
}
