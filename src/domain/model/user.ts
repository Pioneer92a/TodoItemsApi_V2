/**
 * user entity
 */
export class user {
  name: string;
  email: string;
  uuid: string;

  constructor(newUser) {
    this.name = newUser.name;
    this.email = newUser.email;
    this.uuid = newUser.uuid;
  }
}
