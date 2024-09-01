import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superUser = {
  email: "mehnaz@gmail.com",
  name: "Super Admin",
  phone: "string",
  profileImg:
    "https://res.cloudinary.com/dj3m1cb0v/image/upload/v1724655483/superAdmin_xtohhs.png",

  address: "default",
  password: config.super_admin_password,

  role: USER_ROLE.admin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.admin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
