export class ApplicationService {
  /**
   * creates two different payloads FOR TASKS based on req
   */
  static createPayloadForTask(req) {
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
   * creates two different payloads FOR USERS based on req
   */
  static createPayloadForUser(req) {
    if (req.user) {
      // create a payload for 'findOrCreateUser'
      return {
        name: req.user.name.givenName,
        email: req.user.emails[0].value,
      };
      //
    } else {
      // create a payload for others
      const payload = { userUUID: req.params.uuid.toString() };
      return payload;
    }
  }
}
