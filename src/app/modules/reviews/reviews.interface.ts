import { ObjectId } from "mongoose";

export type TReview = {
  facility: ObjectId;
  email: string;
  rating: number;
  comment: string;
};
