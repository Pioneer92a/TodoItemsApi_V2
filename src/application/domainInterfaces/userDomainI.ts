import { user } from "../../domain/model/user";

export interface UserDomainI {
  createNewUser(payload): Promise<user>;
  loginUser(email): Promise<user>;
  logoutUser(userUUID): Promise<user>;
  findUserbyUUID(userUUID): Promise<user>;
  findUserbyEmail(email): Promise<user>;
  deleteUser(userUUID): Promise<user>;
  updateUser(userUUID): Promise<user>;
}
