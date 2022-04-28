import { portNumber } from "./Presentation/Services/Commander";
import { app } from "./Presentation/Services/ServerSetting";

// SERVER STARTS LISTENING
app.listen(portNumber, () => {
  console.log(`server listening on port ${portNumber}`);
});
