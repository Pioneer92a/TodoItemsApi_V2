import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
// const mongodb_URL = process.env.mongodb_URL
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const SERVER_ROOT_URI = process.env.GOOGLE_CLIENT_SECRET;

export {
  port,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
};
