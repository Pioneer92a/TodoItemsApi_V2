// in this file, we implement auth.js middleware for the authentication of the user

import AuthServices from "../Services/AuthServices";
import { handleError } from "../Services/ControllerServices";

export const isLoggedInCb = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export const userAuth = async (req, res, next) => {
  try {
    const { _uuid } = AuthServices.decodeUUIDFromHeader(req); // destructuring concept used ... it is decoded._uuid actually
    AuthServices.throwErrorIfNoUUID(_uuid);
    await AuthServices.throwErrorIfUserDoesNotExist(_uuid);
    await AuthServices.throwErrorIfUserNotLoggedIn(_uuid);
    req.params.uuid = _uuid;
    next();
  } catch (error) {
    handleError(error, res);
  }
};

export const taskAuth = async (req, res, next) => {
  try {
    const { _uuid } = AuthServices.decodeUUIDFromHeader(req); // destructuring concept used ... it is decoded._uuid actually
    AuthServices.throwErrorIfNoUUID(_uuid);
    req.body.userUUID = _uuid; // attach the userUUID with the request
    await AuthServices.throwErrorIfUserDoesNotExist(_uuid);
    await AuthServices.throwErrorIfUserNotLoggedIn(_uuid);

    // skip the rest if request is 'create new task' or 'getAll'
    if (
      req.originalUrl.includes("newtask") ||
      req.originalUrl.includes("getAllTasks")
    ) {
      next();
    }

    // for cases of read, delete, update, do the following:
    else {
      await AuthServices.throwErrorIfTaskDoesNotExist(Number(req.params.id));
      next();
    }
    //
  } catch (error) {
    handleError(error, res);
  }
};
