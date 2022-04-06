export class UserService {
    static createUserEntity(user) {
        const newUserEntity = {
            name: user.name,
            email: user.email,
            uuid: user.uuid,
            password: user.password,
            token: user.token, // this shouldn't be here in the entity
        };
        return newUserEntity;
      }
}