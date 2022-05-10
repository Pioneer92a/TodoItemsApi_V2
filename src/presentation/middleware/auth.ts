// in this file, we implement auth.js middleware for the authentication of the user

import { handleError } from "../Services/ControllerServices";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Infrastructure/Config";

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

export const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded._uuid);
    req.params.uuid = decoded._uuid;
    if (!req.params.uuid)
      throw new Error(`request body doesn't contain userUUID info`);
    next();
  } catch (error) {
    handleError(error, res);
  }
};

export const taskAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded._uuid);
    req.body.userUUID = decoded._uuid;
    if (!req.body.userUUID)
      throw new Error(`request body doesn't contain userUUID info`);
    next();
  } catch (error) {
    handleError(error, res);
  }
};
