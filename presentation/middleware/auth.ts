// in this file, we implement auth.js middleware for the authentication of the user

// import { User } from "../../infrastructure/db/model/userMongo"; // import user model

// defining middlewares
const auth2 = async (req, res, next) => {
  //middleware
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const auth = async (req, res, next) => {
  next();
};

export { auth, auth2 };
