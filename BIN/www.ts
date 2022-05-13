import { portNumber } from "../src/Infrastructure/Commander";
import { app } from "../src/Presentation/Services/ServerSetting";

// SERVER STARTS LISTENING
app.listen(portNumber, () => {
  console.log(`server listening on port ${portNumber}`);
});
