import { TaskRepositoryI } from "../Domain/Task/TaskRepository";
import { UserRepositoryI } from "../Domain/User/UserRepository";

/**
 * throw an error if user doesn't exist
 */
export function throwErrorIfUserDoesNotExist(_user) {
  if (!_user) throw new Error("the user does not exist");
}

/**
 * throw an error if user isn't logged in
 */
export function throwErrorIfUserNotLoggedIn(isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("user is not logged in");
}

/**
 * throw an error if the task doesn't exist
 */
export function throwErrorIfTaskDoesNotExist(task) {
  if (!task) throw new Error("task does not exist");
}

/**
 * check if user exists and is logged in
 */
export async function validateUser(
  userUUID: string,
  userRepository: UserRepositoryI
) {
  // does the user exist?
  const _user = await userRepository.fetchUserbyUUID(userUUID);
  throwErrorIfUserDoesNotExist(_user);
  // is the user loggedIn ?
  // const isLoggedIn = await userRepository.isUserLoggedIn(userUUID);
  const isLoggedIn = true; // TODO LATER
  throwErrorIfUserNotLoggedIn(isLoggedIn);
  //
}

/**
 * check if the Task exists
 */
export async function validateTask(task, taskRepository: TaskRepositoryI) {
  const _task = await taskRepository.fetchTask(parseInt(task.taskId));
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
