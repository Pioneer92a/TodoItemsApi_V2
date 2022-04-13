import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
// const mongodb_URL = process.env.mongodb_URL
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NGROK_URI = process.env.NGROK_URI;

export { port, JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NGROK_URI };
