export class GeneralUserDTO {
  uuid: string;
  constructor(uuid) {
    this.uuid = uuid;
    throwErrorIfNoUUID(this.uuid);
  }
}

export class FindOrAddUserDTO {
  name: string;
  email: string;
  constructor(req) {
    this.name = req.user.name.givenName;
    this.email = req.user.emails[0].value;
    throwErrorIfNoName(this.name);
    throwErrorIfNoEmail(this.email);
  }
}

export class LoginOrAddUserDTO {
  name: string;
  email: string;
  constructor(name, email) {
    this.name = name;
    this.email = email;
    throwErrorIfNoName(this.name);
    throwErrorIfNoEmail(this.email);
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
