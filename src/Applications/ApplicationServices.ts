import { TaskRepositoryI } from "../Domain/Task/Repository";
import { UserRepositoryI } from "../Domain/User/Repository";

export async function checkIfTaskExists(
  taskId: number,
  taskRepository: TaskRepositoryI
) {
  const _task = await taskRepository.fetchTask(taskId);
  if (!_task) throw new Error("task does not exist");
}

/**
 * throw an error if user with this email doesn't exist
 */
export async function throwErrorUfUserNotFoundByEmail(
  email: string,
  userRepository: UserRepositoryI
) {
  if (!(await userRepository.fetchUserbyEmail(email)))
    throw new Error(`user having following email not found: ${email}`);
}
