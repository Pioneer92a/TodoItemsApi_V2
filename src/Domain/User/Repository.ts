import { UserEntity } from "./Entity";

export interface UserRepositoryI {
  addNewUser(newUser: UserEntity): Promise<UserEntity>;
  fetchUserbyUUID(userUUID: string): Promise<UserEntity>;
  fetchUserbyEmail(userEmail: string): Promise<UserEntity>;
  fetchUserLoginStatus(userUUID: string): Promise<boolean>;
  deleteUser(userUUID: string): Promise<UserEntity>;
  logout(userUUID: string): Promise<UserEntity>;
  login(userEmail: string): Promise<UserEntity>;
}
