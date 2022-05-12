import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express"; // import express server
import { UserController } from "../Controllers/UserController";
import { auth2 as isLoggedInCb } from "../Middleware/Auth";
import { router as taskRouter } from "../Routers/TaskRouter"; // import tasks router
import { router as userRouter } from "../Routers/UserRouter"; // import tasks router
import { passport } from "../Services/PassportService";
const cookieSession = require("cookie-session");
const userControllers = new UserController();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("you are not logged in");
});

app.get("/failed", (req, res) => {
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

// PASSPORT related routes are declared here
//
// (1) MAIN LOGIN ROUTE
app.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//
// JUST LOGS OUT THE CURRENT SESSION
app.get("/logout", (req, res) => {
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

export { app };
