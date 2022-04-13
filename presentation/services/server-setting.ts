import * as express from "express"; // import express server
import * as cors from "cors";
import * as bodyParser from "body-parser";
const cookieSession = require("cookie-session");

import { UserControllers } from "../controllers/user";
const userControllers = new UserControllers()
import { auth2 as isLoggedInCb } from "../middleware/auth";

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

//   app.get("/good", isLoggedInCb, userControllers.findOrCreateUser); // somehow it needs to be in index file to work


export {app}