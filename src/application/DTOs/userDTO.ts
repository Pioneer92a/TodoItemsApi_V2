import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../EntityFactory";

/**
 * check if a user Entity can be made. if yes Return the entity
 */
export function findOrCreateNewUserDTO(payload) {
  checkReqUser(payload);
  //
  return EntityFactory.createUser({
    name: payload.name,
    email: payload.email,
    uuid: uuidv1(),
  });
}

export function UserDTOGenPurpose(payload) {
  checkReqParamUUID(payload);
  return payload;
}

function checkReqParamUUID(payload) {
  if (!payload.userUUID) throw new Error(`request body doesn't contain UUID`);
}

function checkReqUser(payload) {
  if (!payload.name || !payload.email)
    throw new Error(`request body doesn't contain name or email`);
}
