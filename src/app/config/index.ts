import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUND || "10", 10),
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.jwt_access_expires_in,
  // bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
};
