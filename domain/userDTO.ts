import { v1 as uuidv1 } from "uuid";

// this class actually makes a real user entity
export class userDTO {
  name: string;
  email: string;
  // token: string;
  uuid: string;
  password: string;

  constructor(newUser) {
    this.name = newUser.name;
    this.email = newUser.email;
    this.uuid = uuidv1(); // generate uuid
    // this.token = this.generateToken(); // generate a token
    this.password = newUser.password;
  }

  // generateToken() {
  //   try {
  //     // create a token based on id
  //     // the decoded object from this token will have uuid which will be equal to real id if decoding is correct
  //     const token = jwt.sign({ uuid: this.uuid.toString() }, JWT_SECRET);

  //     return token;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
