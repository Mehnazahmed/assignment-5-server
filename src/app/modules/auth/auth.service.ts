import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

const userSignUpIntoDb = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

export const authServices = {
  userSignUpIntoDb,
};
