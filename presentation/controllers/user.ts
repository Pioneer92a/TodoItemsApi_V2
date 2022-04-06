import { UserApplicationService } from "../../application/userService";
const userApplicationService = new UserApplicationService();

interface UserControllersI {
  createNewUser(req, res);
  loginUser(req, res);
  logoutUser(req, res);
  getUserDetails(req, res);
  deleteUser(req, res);
  updateUser(req, res)
}

export class UserControllers implements UserControllersI {
  async createNewUser(req, res) {
    let newUser;
    try {
      newUser = await userApplicationService.createNewUser(req.body);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!newUser) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "New user creation performed", newUser });
  }

  async loginUser(req, res) {
    let loginUser;
    try {
      loginUser = await userApplicationService.loginUser(req.body);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!loginUser) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "Login performed", loginUser });
  }

  async logoutUser(req, res) {
    let logoutUser;
    try {
      logoutUser = await userApplicationService.logoutUser(req.uuid);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!logoutUser) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "Logout performed", logoutUser });
  }

  async getUserDetails(req, res) {
    let user;

    try {
      // wait for user details
      user = await userApplicationService.findUser(req.uuid);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!user) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "user found:", user });
  }

  async deleteUser(req, res) {
    let user;
    try {
      user = await userApplicationService.deleteUser(req.uuid);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!user) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "user deleted:", user });
  }

  async updateUser(req, res) {
    let user;
    try {
      user = await userApplicationService.updateUser(req.uuid);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!user) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "user updated:", user });
  }
}
