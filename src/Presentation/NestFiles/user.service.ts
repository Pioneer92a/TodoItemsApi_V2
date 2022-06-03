import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  getHello(): string {
    return "Hello World!";
  }

  fetchUser() {
    return "fetchUser is called";
  }
}
