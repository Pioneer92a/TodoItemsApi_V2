import { portNumber } from "../src/Infrastructure/Cross-Cutting/Commander";
import { logger } from "../src/Infrastructure/Cross-Cutting/LoggerService";
import app from "../src/Presentation/Services/ServerSetting";

// SERVER STARTS LISTENING
app.listen(portNumber, () => {
  logger.info(`server listening on port ${portNumber}`);
});
