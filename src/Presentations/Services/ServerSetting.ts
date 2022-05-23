import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express"; // import express server
import {
  logger,
  loggerMidleware,
} from "../../Infrastructures/Cross-Cutting/LoggerService";
import { isLoggedInCb } from "../Middleware/Auth";
import { passport } from "./PassportService";
import { router as taskRouter } from "../Task/Router"; // import tasks router
import { UserController } from "../User/Controller";
import { router as userRouter } from "../User/Router"; // import tasks router
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require("cookie-session");
const userControllers = new UserController();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  logger.info("you are not logged in");
  res.send("you are not logged in");
});

app.get("/failed", (req, res) => {
  logger.error("you failed to login");
  res.send("you failed to login");
});

app.use(
  cookieSession({
    name: "todo-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(taskRouter);
app.use(userRouter);
app.use(loggerMidleware);

// PASSPORT related routes are declared here
//
// (1) MAIN LOGIN ROUTE
app.get(
  "/login",
  (req, res, next) => {
    logger.info("login route accessed");
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//
// JUST LOGS OUT THE CURRENT SESSION
app.get("/logout", (req, res) => {
  logger.info("logout route accessed");
  req.session = null; // most probably a reduntant step
  req.logout(); // remover the req.user property and clear the login session
  res.redirect("/"); // redirect to the homepage
  // note: The session still keeps the cookies which doesn't properly destroy the session
});
//
// (2) REDIRECT LINK
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);
//
// (3) CREATE THE MAIN LOGIN REDIRECT ROUTE
app.get("/good", isLoggedInCb, userControllers.findOrAddUser);
//

export default app;
