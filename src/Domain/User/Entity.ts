/**
 * user entity
 */
export class UserEntity {
  name: string;
  email: string;
  uuid: string;
  token?: string;

  constructor(_uuid: string, _name: string, _email: string) {
    this.name = _name;
    this.email = _email;
    this.uuid = _uuid;
  }
}
