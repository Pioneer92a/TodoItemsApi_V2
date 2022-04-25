import { User } from "@prisma/client";

export interface UserRepositoryI {
  createNewUser(newUser): Promise<User>;
  findUserbyUUID(userID): Promise<User>;
  findUserbyEmail(userEmail): Promise<User>;
  findUserbyId(userId): Promise<User>;
  deleteUser(userID): Promise<User>;
  logout(payload): Promise<User>;
  login(payload): Promise<User>;
  updateUser(userId): Promise<User>;
}
