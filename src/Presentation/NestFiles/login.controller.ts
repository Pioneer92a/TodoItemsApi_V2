import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginService } from "./login.service";

@Controller("google")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}

  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    console.log("redirect is successful");

    return this.loginService.googleLogin(req);
  }
}
