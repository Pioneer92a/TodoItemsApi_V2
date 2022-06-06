import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import AuthServices from "./Services/AuthServices";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { _uuid } = AuthServices.decodeUUIDFromHeader(req);
    AuthServices.throwErrorIfNoUUID(_uuid);
    await AuthServices.throwErrorIfUserDoesNotExist(_uuid);
    await AuthServices.throwErrorIfUserNotLoggedIn(_uuid);
    req.body.uuid = _uuid;
    next();
  }
}
