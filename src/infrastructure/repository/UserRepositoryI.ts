export interface UserRepositoryI {
  createNewUser(newUser);
  findUserbyUUID(userID);
  findUserbyEmail(userEmail);
  deleteUser(userID);
  logout(payload);
  login(payload);
  updateUser(userId);
}
