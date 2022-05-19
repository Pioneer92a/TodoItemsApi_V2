import expressPinoLogger from "express-pino-logger";
import pino from "pino";

// ...
const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};
// ...
const logger = pino(
  {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
      },
    },
    customLevels: levels, // our defined levels
    useOnlyCustomLevels: true,
    level: "http",
  }
  //   pino.destination(`${__dirname}/logger.log`)
);

const loggerMidleware = expressPinoLogger({
  logger: logger,
  autoLogging: false,
});

export { logger, loggerMidleware };
