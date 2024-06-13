import { Model } from "mongoose";

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
