import { v1 as uuidv1 } from "uuid";

/**
 * user entity
 */
export class user {
  name: string;
  email: string;
  uuid: string;
  password: string;

  constructor(newUser) {
    this.name = newUser.name;
    this.email = newUser.email;
    this.uuid = uuidv1(); // generate uuid
    this.password = "dummyPass";
  }
}
