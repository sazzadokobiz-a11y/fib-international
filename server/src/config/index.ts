import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: Number(process.env.PORT) || 5000,
  database_uri: process.env.DATABASE_URI || "",
  secret: process.env.JWT_SECRET || "",
  env: process.env.NODE_ENV || "development",
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS
};