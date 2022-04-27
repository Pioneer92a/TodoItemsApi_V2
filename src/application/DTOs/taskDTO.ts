import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../EntityFactory";

/**
 * check if a task Entity can be made. Return the task entity
 */
export function createNewTaskDTO(payload) {
  checkReqBodyName(payload);
  //
  return EntityFactory.createTask({
    name: payload.name,
    userUUID: payload.userUUID,
    uuid: uuidv1(),
  });
}

/**
 * DTO for RUD: Read, Update, Delete
 */
export function taskDTOforRUD(payload) {
  checkReqParamId(payload);
  return payload;
}

export function getAllTasksDTO(payload) {
  checkReqParamPage(payload);
  //
  return payload;
}

function checkReqParamId(payload) {
  if (!payload.taskId) throw new Error(`payload doesn't contain task ID`);
}

function checkReqBodyName(payload) {
  if (!payload.name) throw new Error(`payload doesn't contain name`);
}

function checkReqParamPage(payload) {
  if (!payload.page) throw new Error(`payload doesn't contain page`);
}
