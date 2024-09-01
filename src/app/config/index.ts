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
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  // bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,

  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  amar_pay_storeId: process.env.STORE_ID,
  amar_pay_signature_key: process.env.SIGNATUREKEY,
  amar_pay_Payment_Url: process.env.PAYMENT_URL,
  amar_pay_Payment_verify_Url: process.env.PAYMENT_VERIFY_URL,
};
