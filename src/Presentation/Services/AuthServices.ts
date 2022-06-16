import { JWT_SECRET } from "@infra/Cross-Cutting/Config";
import { TaskRepository } from "@infra/Repository/TaskRepository";
import { UserRepository } from "@infra/Repository/UserRepository";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

const userRepository = new UserRepository();
const taskRepository = new TaskRepository();

class AuthServices {
  static decodeUUIDFromHeader(req) {
    let token = req.header("Authorization");
    AuthServices.throwErrorIfNoUUID(token);
    token = token.replace("Bearer ", "");
    return jwt.verify(token, JWT_SECRET);
  }

  static throwErrorIfNoUUID(uuid: string) {
    if (!uuid)
      throw new HttpException(
        `request body doesn't contain userUUID info`,
        HttpStatus.BAD_REQUEST
      );
  }

  static async throwErrorIfUserDoesNotExist(uuid: string) {
    const user = await userRepository.fetchUserbyUUID(uuid);
    if (!user)
      if (!uuid)
        throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
  }

  static async throwErrorIfUserNotLoggedIn(uuid: string) {
    const isLoggedIn = await userRepository.fetchUserLoginStatus(uuid);
    if (!isLoggedIn)
      throw new HttpException(`user not logged in`, HttpStatus.UNAUTHORIZED);
  }

  static async throwErrorIfTaskDoesNotExist(taskId: number) {
    const task = await taskRepository.fetchTask(taskId);
    if (!task) throw new HttpException(`task not found`, HttpStatus.NOT_FOUND);
  }
}

export default AuthServices;
