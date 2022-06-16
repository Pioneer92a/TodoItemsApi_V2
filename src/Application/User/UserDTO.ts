import { z } from "zod";
const stringSchema = z.string().min(1); // shouldn't be empty
const uuidSchema = z.string().uuid();
const emailSchema = z.string().email();

export class GeneralUserDTO {
  constructor(readonly uuid: string) {
    uuidSchema.parse(uuid); // check if userUUID is correct
  }
}

export class LoginOrAddUserDTO {
  constructor(readonly name: string, readonly email: string) {
    stringSchema.parse(name); // check if name is existent
    emailSchema.parse(email); // check if name is existent
  }
}
