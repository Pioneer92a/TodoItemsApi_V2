import { TaskDomain } from "../Domain/TaskDomain";
import { UserDomain } from "../Domain/UserDomain";

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
export async function validateUser(userUUID: string, userDomain: UserDomain) {
  // does the user exist?
  const _user = await userDomain.findUserbyUUID(userUUID);
  throwErrorIfUserDoesNotExist(_user);
  // is the user loggedIn ?
  const isLoggedIn = await userDomain.isUserLoggedIn(userUUID);
  throwErrorIfUserNotLoggedIn(isLoggedIn);
  //
}

/**
 * check if the Task exists
 */
export async function validateTask(task, taskDomain: TaskDomain) {
  const _task = await taskDomain.getTask(parseInt(task.taskId));
  throwErrorIfTaskDoesNotExist(_task);
}

/**
 * throw an error if user with this email doesn't exist
 */
export async function validateUserByEmail(
  email: string,
  userDomain: UserDomain
) {
  if (!(await userDomain.findUserbyEmail(email)))
    throw new Error(`user having following email not found: ${email}`);
}

/**
 * throw an error if user with this email doesn't exist
 */
export async function validateUserByUUID(
  userUUID: string,
  userDomain: UserDomain
) {
  if (!(await userDomain.findUserbyUUID(userUUID)))
    throw new Error(`user having following UUID not found: ${userUUID}`);
}
