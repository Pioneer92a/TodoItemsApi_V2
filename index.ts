import { router as taskRouter } from "./presentation/routers/task"; // import tasks router
import { router as userRouter } from "./presentation/routers/user"; // import tasks router
import { passport } from "./presentation/services/passport-service";
import { app } from "./presentation/services/server-setting";
import { UserControllers } from "./presentation/controllers/user";
const userControllers = new UserControllers();
import { auth2 as isLoggedInCb } from "./presentation/middleware/auth";

app.use(passport.initialize());
app.use(passport.session());
app.use(taskRouter);
app.use(userRouter);

// PASSPORT related routes are declared here
app.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/logout", (req, res) => {
  console.log("isAuthenticated?: ", req.isAuthenticated());
  req.session = null; // destroy the session
  req.logout(); // logout the user
  res.redirect("/"); // redirect to the homepage
});
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);
app.get("/good", isLoggedInCb, userControllers.findOrCreateUser);

// SERVER STARTS LISTENING
app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
