import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT
// const mongodb_URL = process.env.mongodb_URL
const JWT_SECRET = process.env.JWT_SECRET

export {port, JWT_SECRET}

// module.exports = {
//   port: process.env.PORT,
//   mongodb_URL: process.env.mongodb_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
// };
