export class ControllerService {
  /**
   * creates two different payloads FOR TASKS based on req
   */
  static createPayload(req) {
    // create a payload for 'createNewTask'
    if (req.body.name) return { name: req.body.name, uuid: req.body.userUUID };
    // create a payload for pagination getAll
    else if (req.params.page)
      return {
        page: req.params.page,
        uuid: req.body.userUUID,
      };
    // create a payload for others
    else if (req.params.id)
      return { taskId: req.params.id, uuid: req.body.userUUID };
  }

  /**
   * handles response for task
   */
  static handleResponseForTask(task, res) {
    // // check if task FOUND ??
    // if (!task) return res.status(404).send({ msg: "something went wrong !!!" });
    // else return res.status(200).send({ msg: "task operation performed", task });
    if (task)
      return res.status(200).send({ msg: "task operation performed", task });
  }

  /**
   * creates two different payloads FOR USERS based on req
   */
  static createPayloadForUser(req) {
    if (!req.params.uuid) {
      // create a payload for 'createNewTask'
      const payload = {
        name: req.user.name.givenName,
        email: req.user.emails[0].value,
      };
      return payload;
      //
    } else {
      // create a payload for others
      const payload = { userUUID: req.params.uuid.toString() };
      return payload;
    }
  }

  /**
   * handles response for user
   */
  static handleResponseForUser(user, res) {
    // // check if USER FOUND ??
    // if (!user) res.status(404).send({ msg: "user not found/created !!!" });
    // else res.status(200).send({ msg: "user operation performed", user });

    if (user)
      return res.status(200).send({ msg: "user operation performed", user });
  }
}
