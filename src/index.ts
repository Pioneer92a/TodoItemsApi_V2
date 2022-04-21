import { router as taskRouter } from "./presentation/routers/taskRouter"; // import tasks router
import { router as userRouter } from "./presentation/routers/userRouter"; // import tasks router
import { passport } from "./presentation/services/passport-service";
import { app } from "./presentation/services/server-setting";
import { UserController } from "./presentation/controllers/userController";
const userControllers = new UserController();
import { auth2 as isLoggedInCb } from "./presentation/middleware/auth";

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
app.get("/good", isLoggedInCb, userControllers.findOrCreateUser);

//
// SERVER STARTS LISTENING
app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
