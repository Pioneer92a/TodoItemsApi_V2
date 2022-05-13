export class GeneralUserDTO {
  uuid: string;
  constructor(_uuid: string) {
    throwErrorIfNoUUID(_uuid);
    this.uuid = _uuid;
  }
}

export class FindOrAddUserDTO {
  name: string;
  email: string;
  constructor(_name: string, _email: string) {
    throwErrorIfNoName(_name);
    throwErrorIfNoEmail(_email);
    this.name = _name;
    this.email = _email;
  }
}

function throwErrorIfNoName(arg: string) {
  if (!arg) throw new Error("user request does not have uuid");
}

function throwErrorIfNoEmail(arg: string) {
  if (!arg) throw new Error("user request does not have uuid");
}

function throwErrorIfNoUUID(arg: string) {
  if (!arg) throw new Error("user request does not have uuid");
}

// export function findOrCreateNewUserDTO(payload) {
//   checkReqUser(payload);
//   //
//   return EntityFactory.createUser({
//     name: payload.name,
//     email: payload.email,
//     uuid: uuidv1(),
//   });
// }

// function checkReqUser(payload: any) {
//   throw new Error("Function not implemented.");
// }
// function uuidv1() {
//   throw new Error("Function not implemented.");
// }
