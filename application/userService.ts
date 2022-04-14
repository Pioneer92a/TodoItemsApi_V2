import { UserDomainServices } from "../domain/userDomainServices";
import { ApplicationService } from "./Application-service";

const userDomainServices = new UserDomainServices();

interface UserApplicationServiceI {
  createNewUser(payload);
  loginUser(payload);
  logoutUser(payload);
  findUser(userID);
  deleteUser(userID);
  updateUser(userID);
  findOrCreateUser(req);
  findUserByEmail(email);
}

export class UserApplicationService implements UserApplicationServiceI {
  /**
   * perform login if user is found, otherwise create a new one in local database
   */
  async findOrCreateUser(req) {
    // input validations
    if (!req.user) throw new Error(`request body doesn't contain user info`);

    // const payload = ApplicationService.createPayloadForUser(req);
    const payload = {
      name: req.user.name.givenName,
      email: req.user.emails[0].value,
    };

    const user = await this.findUserByEmail(payload.email);

    // if user is found, then login
    if (user) return await this.loginUser(payload.email);

    // create new user if not already in database
    if (!user) return await this.createNewUser(payload);
  }

  async createNewUser(payload) {
    return await userDomainServices.createNewUser(payload);
  }

  async loginUser(payload) {
    return await userDomainServices.loginUser(payload);
  }

  async logoutUser(req) {
    const payload = { userUUID: req.params.uuid.toString() };
    return await userDomainServices.logoutUser(payload.userUUID);
  }

  async findUser(req) {
    const payload = { userUUID: req.params.uuid.toString() };
    return await userDomainServices.findUserbyUUID(payload.userUUID);
  }

  async findUserByEmail(email) {
    return await userDomainServices.findUserbyEmail(email);
  }

  async deleteUser(req) {
    const payload = { userUUID: req.params.uuid.toString() };
    return await userDomainServices.deleteUser(payload.userUUID);
  }

  async updateUser(userID) {
    return await userDomainServices.updateUser(userID);
  }
}
