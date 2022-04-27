export enum userPayloadType {
  findOrCreate,
  generalPurpose,
}

export enum taskPayloadType {
  createNewTask,
  generalPurpose,
  getAllTasks,
}

/**
 * handles response for task
 */
export function handleTaskResponse(task, res) {
  if (task)
    return res.status(200).send({ msg: "task operation performed", task });
}

/**
 * handles response for user
 */
export function handleUserResponse(user, res) {
  if (user)
    return res.status(200).send({ msg: "user operation performed", user });
}

export function handleError(error, res) {
  console.log(error);
  return res.status(400).send(error.message);
}

export function createUserPayload(req, type: userPayloadType) {
  switch (type) {
    case userPayloadType.findOrCreate:
      return {
        name: req.user.name.givenName,
        email: req.user.emails[0].value,
      };
      break;
    //
    case userPayloadType.generalPurpose:
      return { userUUID: req.params.uuid };
      break;

    default:
      break;
  }
}

export function createTaskPayload(req, type: taskPayloadType) {
  switch (type) {
    case taskPayloadType.createNewTask:
      return { name: req.body.name, userUUID: req.body.userUUID };
      break;
    //
    case taskPayloadType.generalPurpose:
      return { taskId: req.params.id, userUUID: req.body.userUUID };
      break;
    //
    case taskPayloadType.getAllTasks:
      return { page: req.params.page, userUUID: req.body.userUUID };
      break;

    default:
      break;
  }
}
