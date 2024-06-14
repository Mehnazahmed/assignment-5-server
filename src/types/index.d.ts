// import { JwtPayload } from "jsonwebtoken";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload;
//     }
//   }
// }

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// import { Request } from "express";
// import { Document, Types } from "mongoose";

// declare global {
//   namespace Express {
//     interface User extends Document {
//       _id: Types.ObjectId;
//       role: "user" | "admin";
//     }

//     interface Request {
//       user?: User;
//     }
//   }
// }
