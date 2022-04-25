import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../entityFactory";

function checkReqParamId(req) {
  if (!req.params.id) throw new Error(`request body doesn't contain task ID`);
}

function checkReqBodyName(req) {
  if (!req.body.name) throw new Error(`request body doesn't contain name`);
}

function checkReqParamPage(req) {
  if (!req.params.page) throw new Error(`request body doesn't contain page`);
}
/**
 * check if a task Entity can be made. Return the task entity
 */
export function createNewTaskDTO(req) {
  checkReqBodyName(req);
  //
  return EntityFactory.createTask({
    name: req.body.name,
    userUUID: req.body.userUUID,
    uuid: uuidv1(),
  });
}

/**
 * DTO for RUD: Read, Update, Delete
 */
export function taskDTOforRUD(req) {
  checkReqParamId(req);
  //
  return { taskId: req.params.id, userUUID: req.body.userUUID };
}

export function getAllTasksDTO(req) {
  checkReqParamPage(req);
  //
  return { page: req.params.page, userUUID: req.body.userUUID };
}
