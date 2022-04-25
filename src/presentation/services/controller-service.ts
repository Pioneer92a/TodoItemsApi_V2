export class ControllerService {
  /**
   * handles response for task
   */
  static handleTaskResponse(task, res) {
    if (task)
      return res.status(200).send({ msg: "task operation performed", task });
  }

  /**
   * handles response for user
   */
  static handleUserResponse(user, res) {
    if (user)
      return res.status(200).send({ msg: "user operation performed", user });
  }

  static handleError(error, res) {
    return res.status(400).send(error.message);
  }
}
