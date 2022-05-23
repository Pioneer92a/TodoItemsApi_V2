import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NGROK_URI = process.env.NGROK_URI;
const Task_Pagination_Limit = process.env.Task_Pagination_Limit;
const SEED_DATA_LIMIT = process.env.SEED_DATA_LIMIT;

export {
  port,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NGROK_URI,
  Task_Pagination_Limit,
  SEED_DATA_LIMIT,
};
