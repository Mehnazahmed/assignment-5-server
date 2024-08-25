import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImg?: string;
  role: "admin" | "user" | "superAdmin";
  address: string;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
