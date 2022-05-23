import { portNumber } from "../../Infrastructures/Cross-Cutting/Commander";
import { logger } from "../../Infrastructures/Cross-Cutting/LoggerService";
import app from "../Services/ServerSetting";

// SERVER STARTS LISTENING
app.listen(portNumber, () => {
  logger.info(`server listening on port ${portNumber}`);
});
