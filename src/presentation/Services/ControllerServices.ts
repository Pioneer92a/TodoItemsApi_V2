import { logger } from "../../Infrastructure/Cross-Cutting/LoggerService";

export function handleTaskResponse(task, res) {
  if (task) {
    logger.info("task operation performed");
    return res.status(200).send({ msg: "task operation performed", task });
  }
}

export function handleUserResponse(user, res) {
  if (user) {
    logger.info("user operation performed");
    return res.status(200).send({ msg: "user operation performed", user });
  }
}

export function handleError(error, res) {
  logger.error(error);
  return res.status(400).send(error.message);
}
