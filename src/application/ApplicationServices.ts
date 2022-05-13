import { TaskRepositoryI } from "../Domain/Task/Repository";
import { UserRepositoryI } from "../Domain/User/Repository";

export async function checkIfUserExists(
  userUUID: string,
  userRepository: UserRepositoryI
) {
  const _user = await userRepository.fetchUserbyUUID(userUUID);
  throwErrorIfUserDoesNotExist(_user);
}

export async function checkIfUserLoggedIn(
  userUUID: string,
  userRepository: UserRepositoryI
) {
  const _userLoginStatus = await userRepository.fetchUserLoginStatus(userUUID);
  throwErrorIfUserNotLoggedIn(_userLoginStatus);
}

export async function checkIfTaskExists(
  taskId: number,
  taskRepository: TaskRepositoryI
) {
  const _task = await taskRepository.fetchTask(taskId);
  throwErrorIfTaskDoesNotExist(_task);
}

/**
 * throw an error if user with this email doesn't exist
 */
export async function validateUserByEmail(
  email: string,
  userRepository: UserRepositoryI
) {
  if (!(await userRepository.fetchUserbyEmail(email)))
    throw new Error(`user having following email not found: ${email}`);
}

/**
 * throw an error if user with this email doesn't exist
 */
export async function validateUserByUUID(
  userUUID: string,
  userRepository: UserRepositoryI
) {
  if (!(await userRepository.fetchUserbyUUID(userUUID)))
    throw new Error(`user having following UUID not found: ${userUUID}`);
}

function throwErrorIfUserDoesNotExist(arg) {
  if (!arg) throw new Error("the user does not exist");
}

function throwErrorIfUserNotLoggedIn(arg) {
  if (!arg) throw new Error("user is not logged in");
}

function throwErrorIfTaskDoesNotExist(arg) {
  if (!arg) throw new Error("task does not exist");
}
