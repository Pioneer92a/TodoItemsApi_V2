/**
 * user entity
 */
export class UserEntity {
  name: string;
  email: string;
  uuid: string;
  token?: string;

  constructor(newUser) {
    this.name = newUser.name;
    this.email = newUser.email;
    this.uuid = newUser.uuid;
  }
}
