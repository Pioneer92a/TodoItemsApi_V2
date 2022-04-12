import { UserApplicationService } from "../../application/userService";
const userApplicationService = new UserApplicationService();

interface UserControllersI {
  createNewUser(req, res);
  loginUser(req, res);
  logoutUser(req, res);
  getUserDetails(req, res);
  deleteUser(req, res);
  updateUser(req, res)
  findOrCreateUser(req,res)
}



export class UserControllers implements UserControllersI {
   async findOrCreateUser(req, res) {
    let user;
    const payload = { name: req.user.name.givenName, email: req.user.emails[0].value }
    try {
      // wait for user details
      user = await userApplicationService.findOrCreateUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }
  
    // // check if USER FOUND ??
    if (!user) res.status(404).send({ msg: "user not found/created !!!" });
    else res.status(200).send({ msg: "user found/created:", user });
  }
  
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

  // async logoutUser(req, res) {
  //   let logoutUser;
  //   try {
  //     logoutUser = await userApplicationService.logoutUser(req.uuid);
  //   } catch (e) {
  //     res.status(400).send(e);
  //   }

  //   // check if USER FOUND ??
  //   if (!logoutUser) res.status(404).send({ msg: "user not found !!!" });
  //   else res.status(200).send({ msg: "Logout performed", logoutUser });
  // }

  async logoutUser(req, res) {
    const payload = { userUUID: req.params.uuid.toString() }
    const user = await userApplicationService.logoutUser(payload)

       // check if USER FOUND ??
       if (!user) res.status(404).send({ msg: "user not found !!!" });
       else res.status(200).send({ msg: "user found:", user });
  }

  async getUserDetails(req, res) {
    let user;
    const payload = { userUUID: req.params.uuid.toString() }

    try {
      // wait for user details
      user = await userApplicationService.findUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if USER FOUND ??
    if (!user) res.status(404).send({ msg: "user not found !!!" });
    else res.status(200).send({ msg: "user found:", user });
  }

  async deleteUser(req, res) {
    let user;
    const payload = { userUUID: req.params.uuid.toString() }

    try {
      user = await userApplicationService.deleteUser(payload);
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
