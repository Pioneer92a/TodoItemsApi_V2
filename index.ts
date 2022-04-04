import * as express from "express"; // import express server

// import routers
import { router as userRouter } from "./presentation/routers/user"; // import user router
import { router as taskRouter } from "./presentation/routers/task"; // import tasks router

// import port configuration
import { port } from "./infrastructure/config";

/* Defining app to be an express app and the port to use */
const app = express();

app.use(express.json());

// define app routers
app.use(userRouter);
app.use(taskRouter);

// start the server/app
app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});
