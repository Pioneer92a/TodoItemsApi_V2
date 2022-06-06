import { Controller, Delete, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { UserApplication } from "../../Application/User/UserApplication";
import {
  GeneralUserDTO,
  LoginOrAddUserDTO,
} from "../../Application/User/UserDTO";
import { container } from "../../Infrastructure/Cross-Cutting/Container";
import { UserService } from "./user.service";
const userApplication = container.resolve(UserApplication);

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/fetch")
  async fetchUser(@Req() req: Request) {
    const { uuid } = req.body;
    const fetchUserDTO = new GeneralUserDTO(uuid);
    return await userApplication.fetchUserbyUUID(fetchUserDTO);
  }

  @Get("/login")
  async loginOrAddUser(@Req() req: Request) {
    const { name, email } = req.body;
    const findOrAddUserDTO = new LoginOrAddUserDTO(name, email);
    return await userApplication.findOrAddUser(findOrAddUserDTO);
  }

  @Post("/logout")
  async logoutUser(@Req() req: Request) {
    const { uuid } = req.body;
    const logoutUserDTO = new GeneralUserDTO(uuid);
    return await userApplication.logoutUser(logoutUserDTO);
  }

  @Delete("/delete")
  async deleteUser(@Req() req: Request) {
    const { uuid } = req.body;
    const deleteUserDTO = new GeneralUserDTO(uuid);
    return await userApplication.deleteUser(deleteUserDTO);
  }
}
