import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Infrastructures/Cross-Cutting/Config";
import { TaskRepository } from "../../Infrastructures/Repository/TaskRepository";
import { UserRepository } from "../../Infrastructures/Repository/UserRepository";
const userRepository = new UserRepository();
const taskRepository = new TaskRepository();

class AuthServices {
  static decodeUUIDFromHeader(req) {
    const token = req.header("Authorization").replace("Bearer ", "");
    return jwt.verify(token, JWT_SECRET);
  }

  static throwErrorIfNoUUID(uuid: string) {
    if (!uuid) throw new Error(`request body doesn't contain userUUID info`);
  }

  static async throwErrorIfUserDoesNotExist(uuid: string) {
    const user = await userRepository.fetchUserbyUUID(uuid);
    if (!user) throw new Error("user not found");
  }

  static async throwErrorIfUserNotLoggedIn(uuid: string) {
    const isLoggedIn = await userRepository.fetchUserLoginStatus(uuid);
    if (!isLoggedIn) throw new Error("user not logged in");
  }

  static async throwErrorIfTaskDoesNotExist(taskId: number) {
    const task = await taskRepository.fetchTask(taskId);
    if (!task) throw new Error("the task does not exist");
  }
}

export default AuthServices;
