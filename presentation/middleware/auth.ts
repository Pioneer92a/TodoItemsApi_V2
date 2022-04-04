// in this file, we implement auth.js middleware for the authentication of the user

import * as jwt from "jsonwebtoken";
// import { User } from "../../infrastructure/db/model/userMongo"; // import user model
import { JWT_SECRET } from "../../infrastructure/config";

// defining middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // separate token from header

    if (!token) {
      // throw an error if the token not found
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET); // find decoded from token using JWT_SECRET

    req.token = token; // attach the decoded token with the request
    req.uuid = decoded.uuid.toString(); // attach the user id with the request

    next(); // leave middleware and proceed to routers
  } catch (e) {
    res.status(403).send({
      error: "Please authenticate.",
    });
  }

  // console.log("in middleware");
  // next();
};

export { auth };
