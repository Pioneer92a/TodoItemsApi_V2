/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

import { userService } from "../../application/userService";

async function createNewUser(req, res) {
  let newUser;
  try {
    newUser = await userService.createNewUser(req.body);
  } catch (e) {
    res.status(400).send(e);
  }

  // check if USER FOUND ??
  if (!newUser) res.status(404).send({ msg: "user not found !!!" });
  else res.status(200).send({ msg: "New user creation performed", newUser });
}

async function loginUser(req, res) {
  let loginUser;
  try {
    loginUser = await userService.loginUser(req.body);
  } catch (e) {
    res.status(400).send(e);
  }

  // check if USER FOUND ??
  if (!loginUser) res.status(404).send({ msg: "user not found !!!" });
  else res.status(200).send({ msg: "Login performed", loginUser });
}

async function logoutUser(req, res) {
  let logoutUser;
  try {
    logoutUser = await userService.logoutUser(req.uuid);
  } catch (e) {
    res.status(400).send(e);
  }

  // check if USER FOUND ??
  if (!logoutUser) res.status(404).send({ msg: "user not found !!!" });
  else res.status(200).send({ msg: "Logout performed", logoutUser });
}

// async function AllUsersLogout(req, res) {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.status(200).send();
//   } catch (e) {
//     res.status(500).send();
//   }
// }

async function getUserDetails(req, res) {
  let user;

  try {
    // wait for user details
    user = await userService.findUser(req.uuid);
  } catch (e) {
    res.status(400).send(e);
  }

  // check if USER FOUND ??
  if (!user) res.status(404).send({ msg: "user not found !!!" });
  else res.status(200).send({ msg: "user found:", user });
}

// async function updateUser(req, res) {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(401).send({ error: "Invalid updates" });
//   }
//   try {
//     updates.forEach((update) => {
//       req.user[update] = req.body[update];
//     });
//     await req.user.save();
//     return res.status(201).send(req.user);
//   } catch (e) {
//     return res.status(404).send({
//       e,
//     });
//   }
// }

async function deleteUser(req, res) {
  let user;
  try {
    user = await userService.deleteUser(req.uuid);
  } catch (e) {
    res.status(400).send(e);
  }

  // check if USER FOUND ??
  if (!user) res.status(404).send({ msg: "user not found !!!" });
  else res.status(200).send({ msg: "user deleted:", user });
}

export { logoutUser, createNewUser, getUserDetails, deleteUser, loginUser };
