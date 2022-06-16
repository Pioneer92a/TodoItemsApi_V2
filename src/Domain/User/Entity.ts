import { BaseEntity } from "@domain/BaseEntity";

export class UserEntity extends BaseEntity {
  token?: string;

  constructor(uuid: string, name: string, readonly email: string) {
    super(uuid, name);
  }
}
