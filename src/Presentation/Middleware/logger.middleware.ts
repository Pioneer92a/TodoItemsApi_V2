import { Injectable, NestMiddleware } from "@nestjs/common";
import AuthServices from "src/Presentation/Services/AuthServices";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const decoded: any = AuthServices.decodeUUIDFromHeader(req);
    const _uuid = decoded._uuid;
    await AuthServices.throwErrorIfUserDoesNotExist(_uuid);
    await AuthServices.throwErrorIfUserNotLoggedIn(_uuid);
    req.body.uuid = _uuid;
    next();
  }
}
