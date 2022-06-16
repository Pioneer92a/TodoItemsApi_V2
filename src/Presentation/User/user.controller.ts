import { UserApplication } from "@app/User/UserApplication";
import { GeneralUserDTO, LoginOrAddUserDTO } from "@app/User/UserDTO";
import { container } from "@infra/Cross-Cutting/Container";
import { Controller, Delete, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
const userApplication = container.resolve(UserApplication);

@Controller("user")
export class UserController {
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
    return await userApplication.loginOrAddUser(findOrAddUserDTO);
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
