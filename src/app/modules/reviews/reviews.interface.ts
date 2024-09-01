import { ObjectId } from "mongoose";

export type TReview = {
  userName: string;
  email: string;
  rating: number;
  comment: string;
};
