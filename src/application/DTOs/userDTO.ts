import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../entityFactory";

function checkReqParamUUID(req) {
  if (!req.params.uuid) throw new Error(`request body doesn't contain UUID`);
}

function checkReqUser(req) {
  if (!req.user) throw new Error(`request body doesn't contain user info`);
}

/**
 * check if a user Entity can be made. if yes Return the entity
 */
export function findOrCreateUserDTO(req) {
  checkReqUser(req);
  //
  return EntityFactory.createUser({
    name: req.user.name.givenName,
    email: req.user.emails[0].value,
    uuid: uuidv1(),
  });
}

export function UserDTOGenPurpose(req) {
  checkReqParamUUID(req);
  //
  return { userUUID: req.params.uuid.toString() };
}
