// in this file, we implement auth.js middleware for the authentication of the user

import { ControllerService } from "../services/controller-service";

// import { User } from "../../infrastructure/db/model/userMongo"; // import user model

// defining middlewares
export const auth2 = async (req, res, next) => {
  //middleware
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export const auth = async (req, res, next) => {
  next();
};

export const taskAuth = async (req, res, next) => {
  try {
    if (!req.body.userUUID)
      throw new Error(`request body doesn't contain userUUID`);
    next();
  } catch (error) {
    ControllerService.handleError(error, res);
  }
};
